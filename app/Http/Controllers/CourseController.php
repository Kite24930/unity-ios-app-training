<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CourseController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        $locale = $user?->locale ?? 'ja';

        $courses = Course::where('is_published', true)
            ->with(['chapters.lessons'])
            ->orderBy('sort_order')
            ->get()
            ->map(function ($course) use ($user, $locale) {
                $totalLessons = $course->lessons->count();
                $completedLessons = 0;

                if ($user) {
                    $completedLessonIds = $user->completions()->pluck('lesson_id');
                    $completedLessons = $course->lessons->whereIn('id', $completedLessonIds)->count();
                }

                return [
                    'id' => $course->id,
                    'slug' => $course->slug,
                    'title' => $course->getLocalizedTitle($locale),
                    'description' => $course->getLocalizedDescription($locale),
                    'icon' => $course->icon,
                    'color' => $course->color,
                    'difficulty' => $course->difficulty,
                    'estimated_hours' => $course->estimated_hours,
                    'total_lessons' => $totalLessons,
                    'completed_lessons' => $completedLessons,
                    'progress' => $totalLessons > 0 ? round(($completedLessons / $totalLessons) * 100) : 0,
                ];
            });

        return Inertia::render('Courses/Index', [
            'courses' => $courses,
        ]);
    }

    public function show(Request $request, string $courseSlug): Response
    {
        $user = $request->user();
        $locale = $user?->locale ?? 'ja';

        $course = Course::where('slug', $courseSlug)
            ->where('is_published', true)
            ->with(['chapters.lessons'])
            ->firstOrFail();

        $completedLessonIds = $user ? $user->completions()->pluck('lesson_id')->toArray() : [];

        $chapters = $course->chapters->map(function ($chapter) use ($completedLessonIds, $locale) {
            return [
                'id' => $chapter->id,
                'slug' => $chapter->slug,
                'title' => $chapter->getLocalizedTitle($locale),
                'lessons' => $chapter->lessons->map(function ($lesson) use ($completedLessonIds, $locale) {
                    return [
                        'id' => $lesson->id,
                        'slug' => $lesson->slug,
                        'title' => $lesson->getLocalizedTitle($locale),
                        'estimated_minutes' => $lesson->estimated_minutes,
                        'xp_reward' => $lesson->xp_reward,
                        'is_completed' => in_array($lesson->id, $completedLessonIds),
                    ];
                }),
            ];
        });

        $totalLessons = $course->lessons->count();
        $completedCount = $course->lessons->whereIn('id', $completedLessonIds)->count();

        return Inertia::render('Courses/Show', [
            'course' => [
                'id' => $course->id,
                'slug' => $course->slug,
                'title' => $course->getLocalizedTitle($locale),
                'description' => $course->getLocalizedDescription($locale),
                'icon' => $course->icon,
                'color' => $course->color,
                'difficulty' => $course->difficulty,
                'estimated_hours' => $course->estimated_hours,
                'total_lessons' => $totalLessons,
                'completed_lessons' => $completedCount,
                'progress' => $totalLessons > 0 ? round(($completedCount / $totalLessons) * 100) : 0,
            ],
            'chapters' => $chapters,
        ]);
    }
}
