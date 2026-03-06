<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CourseController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Courses/Index', [
            'courses' => Course::withCount('lessons')
                ->orderBy('sort_order')
                ->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Courses/Form');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'slug' => 'required|string|max:255|unique:courses,slug',
            'title' => 'required|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'description' => 'required|string',
            'description_en' => 'nullable|string',
            'icon' => 'required|string|max:10',
            'color' => 'required|string|max:20',
            'sort_order' => 'integer|min:0',
            'estimated_hours' => 'integer|min:0',
            'difficulty' => 'required|in:beginner,intermediate,advanced',
            'is_published' => 'boolean',
        ]);

        Course::create($validated);

        return redirect()->route('admin.courses.index');
    }

    public function edit(Course $course): Response
    {
        return Inertia::render('Admin/Courses/Form', [
            'course' => $course,
        ]);
    }

    public function update(Request $request, Course $course): RedirectResponse
    {
        $validated = $request->validate([
            'slug' => 'required|string|max:255|unique:courses,slug,' . $course->id,
            'title' => 'required|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'description' => 'required|string',
            'description_en' => 'nullable|string',
            'icon' => 'required|string|max:10',
            'color' => 'required|string|max:20',
            'sort_order' => 'integer|min:0',
            'estimated_hours' => 'integer|min:0',
            'difficulty' => 'required|in:beginner,intermediate,advanced',
            'is_published' => 'boolean',
        ]);

        $course->update($validated);

        return redirect()->route('admin.courses.index');
    }

    public function destroy(Course $course): RedirectResponse
    {
        $course->delete();

        return redirect()->route('admin.courses.index');
    }
}
