<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Chapter;
use App\Models\Course;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ChapterController extends Controller
{
    public function index(Course $course): Response
    {
        return Inertia::render('Admin/Chapters/Index', [
            'course' => $course,
            'chapters' => $course->chapters()->withCount('lessons')->orderBy('sort_order')->get(),
        ]);
    }

    public function create(Course $course): Response
    {
        return Inertia::render('Admin/Chapters/Form', [
            'course' => $course,
        ]);
    }

    public function store(Request $request, Course $course): RedirectResponse
    {
        $validated = $request->validate([
            'slug' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'description_en' => 'nullable|string',
            'sort_order' => 'integer|min:0',
        ]);

        $course->chapters()->create($validated);

        return redirect()->route('admin.courses.chapters.index', $course);
    }

    public function edit(Chapter $chapter): Response
    {
        return Inertia::render('Admin/Chapters/Form', [
            'course' => $chapter->course,
            'chapter' => $chapter,
        ]);
    }

    public function update(Request $request, Chapter $chapter): RedirectResponse
    {
        $validated = $request->validate([
            'slug' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'description_en' => 'nullable|string',
            'sort_order' => 'integer|min:0',
        ]);

        $chapter->update($validated);

        return redirect()->route('admin.courses.chapters.index', $chapter->course_id);
    }

    public function destroy(Chapter $chapter): RedirectResponse
    {
        $courseId = $chapter->course_id;
        $chapter->delete();

        return redirect()->route('admin.courses.chapters.index', $courseId);
    }
}
