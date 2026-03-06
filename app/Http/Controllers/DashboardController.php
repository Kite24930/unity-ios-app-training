<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        $locale = $user->locale ?? 'ja';

        $courses = Course::where('is_published', true)
            ->with(['chapters.lessons'])
            ->orderBy('sort_order')
            ->get();

        $completedLessonIds = $user->completions()->pluck('lesson_id')->toArray();

        $courseProgress = $courses->map(function ($course) use ($completedLessonIds, $locale) {
            $lessons = $course->lessons;
            $totalLessons = $lessons->count();
            $completedCount = $lessons->whereIn('id', $completedLessonIds)->count();

            return [
                'slug' => $course->slug,
                'title' => $course->getLocalizedTitle($locale),
                'icon' => $course->icon,
                'color' => $course->color,
                'total_lessons' => $totalLessons,
                'completed_lessons' => $completedCount,
                'progress' => $totalLessons > 0 ? round(($completedCount / $totalLessons) * 100) : 0,
            ];
        });

        $recentCompletions = $user->completions()
            ->with('lesson.chapter.course')
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($completion) use ($locale) {
                return [
                    'lesson_title' => $completion->lesson->getLocalizedTitle($locale),
                    'course_title' => $completion->lesson->chapter->course->getLocalizedTitle($locale),
                    'xp_earned' => $completion->xp_earned,
                    'completed_at' => $completion->created_at->diffForHumans(),
                ];
            });

        $badges = $user->badges->map(function ($badge) use ($locale) {
            return [
                'name' => $badge->getLocalizedName($locale),
                'icon' => $badge->icon,
                'color' => $badge->color,
                'earned_at' => $badge->pivot->created_at->diffForHumans(),
            ];
        });

        $totalLessonsAll = $courses->sum(fn($c) => $c->lessons->count());
        $totalCompleted = count($completedLessonIds);

        return Inertia::render('Dashboard', [
            'stats' => [
                'total_xp' => $user->total_xp,
                'level' => $user->getLevel(),
                'xp_for_current_level' => $user->getXpForCurrentLevel(),
                'current_streak' => $user->current_streak,
                'total_completed' => $totalCompleted,
                'total_lessons' => $totalLessonsAll,
                'overall_progress' => $totalLessonsAll > 0 ? round(($totalCompleted / $totalLessonsAll) * 100) : 0,
            ],
            'courseProgress' => $courseProgress,
            'recentCompletions' => $recentCompletions,
            'badges' => $badges,
        ]);
    }
}
