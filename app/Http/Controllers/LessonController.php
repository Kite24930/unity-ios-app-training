<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Lesson;
use App\Models\LessonCompletion;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LessonController extends Controller
{
    public function show(Request $request, string $courseSlug, string $chapterSlug, string $lessonSlug): Response
    {
        $user = $request->user();
        $locale = $user?->locale ?? 'ja';

        $course = Course::where('slug', $courseSlug)->firstOrFail();

        $chapter = $course->chapters()->where('slug', $chapterSlug)->firstOrFail();

        $lesson = $chapter->lessons()->where('slug', $lessonSlug)->firstOrFail();

        // Get all lessons for navigation
        $allLessons = $course->chapters()
            ->with('lessons')
            ->orderBy('sort_order')
            ->get()
            ->flatMap(function ($ch) use ($courseSlug) {
                return $ch->lessons->map(function ($l) use ($ch, $courseSlug) {
                    return [
                        'id' => $l->id,
                        'slug' => $l->slug,
                        'chapter_slug' => $ch->slug,
                        'course_slug' => $courseSlug,
                        'title' => $l->title,
                    ];
                });
            })->values();

        $currentIndex = $allLessons->search(fn($l) => $l['id'] === $lesson->id);
        $prevLesson = $currentIndex > 0 ? $allLessons[$currentIndex - 1] : null;
        $nextLesson = $currentIndex < $allLessons->count() - 1 ? $allLessons[$currentIndex + 1] : null;

        $completedLessonIds = $user ? $user->completions()->pluck('lesson_id')->toArray() : [];

        return Inertia::render('Lessons/Show', [
            'course' => [
                'slug' => $course->slug,
                'title' => $course->getLocalizedTitle($locale),
                'icon' => $course->icon,
                'color' => $course->color,
            ],
            'chapter' => [
                'slug' => $chapter->slug,
                'title' => $chapter->getLocalizedTitle($locale),
            ],
            'lesson' => [
                'id' => $lesson->id,
                'slug' => $lesson->slug,
                'title' => $lesson->getLocalizedTitle($locale),
                'content' => $lesson->getLocalizedContent($locale),
                'xp_reward' => $lesson->xp_reward,
                'estimated_minutes' => $lesson->estimated_minutes,
                'is_completed' => in_array($lesson->id, $completedLessonIds),
            ],
            'prevLesson' => $prevLesson,
            'nextLesson' => $nextLesson,
            'sidebarLessons' => $course->chapters()->with('lessons')->orderBy('sort_order')->get()->map(function ($ch) use ($completedLessonIds, $locale) {
                return [
                    'title' => $ch->getLocalizedTitle($locale),
                    'slug' => $ch->slug,
                    'lessons' => $ch->lessons->map(function ($l) use ($completedLessonIds, $locale) {
                        return [
                            'id' => $l->id,
                            'slug' => $l->slug,
                            'title' => $l->getLocalizedTitle($locale),
                            'is_completed' => in_array($l->id, $completedLessonIds),
                        ];
                    }),
                ];
            }),
        ]);
    }

    public function complete(Request $request, int $lessonId): RedirectResponse
    {
        $user = $request->user();
        $lesson = Lesson::findOrFail($lessonId);

        $completion = LessonCompletion::firstOrCreate(
            ['user_id' => $user->id, 'lesson_id' => $lesson->id],
            ['xp_earned' => $lesson->xp_reward]
        );

        if ($completion->wasRecentlyCreated) {
            $user->increment('total_xp', $lesson->xp_reward);

            // Update streak
            $today = now()->toDateString();
            if ($user->last_activity_date === null || $user->last_activity_date->toDateString() !== $today) {
                if ($user->last_activity_date && $user->last_activity_date->diffInDays(now()) === 1) {
                    $user->increment('current_streak');
                } elseif (!$user->last_activity_date || $user->last_activity_date->diffInDays(now()) > 1) {
                    $user->current_streak = 1;
                }
                $user->last_activity_date = $today;
                $user->save();
            }

            $this->checkAndAwardBadges($user);
        }

        return back();
    }

    private function checkAndAwardBadges($user): void
    {
        $badges = \App\Models\Badge::all();

        foreach ($badges as $badge) {
            if ($user->badges->contains($badge->id)) {
                continue;
            }

            $earned = false;

            switch ($badge->type) {
                case 'xp_milestone':
                    $required = $badge->criteria['xp'] ?? 0;
                    $earned = $user->total_xp >= $required;
                    break;
                case 'course_complete':
                    $courseId = $badge->criteria['course_id'] ?? null;
                    if ($courseId) {
                        $course = Course::with('lessons')->find($courseId);
                        if ($course) {
                            $lessonIds = $course->lessons->pluck('id');
                            $completed = $user->completions()->whereIn('lesson_id', $lessonIds)->count();
                            $earned = $completed >= $lessonIds->count() && $lessonIds->count() > 0;
                        }
                    }
                    break;
                case 'streak':
                    $required = $badge->criteria['days'] ?? 0;
                    $earned = $user->current_streak >= $required;
                    break;
            }

            if ($earned) {
                $user->badges()->attach($badge->id);
            }
        }
    }
}
