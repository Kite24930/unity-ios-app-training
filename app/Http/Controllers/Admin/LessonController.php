<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Chapter;
use App\Models\Lesson;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LessonController extends Controller
{
    public function index(Chapter $chapter): Response
    {
        return Inertia::render('Admin/Lessons/Index', [
            'chapter' => $chapter->load('course'),
            'lessons' => $chapter->lessons()->orderBy('sort_order')->get(),
        ]);
    }

    public function create(Chapter $chapter): Response
    {
        return Inertia::render('Admin/Lessons/Form', [
            'chapter' => $chapter->load('course'),
        ]);
    }

    public function store(Request $request, Chapter $chapter): RedirectResponse
    {
        $validated = $request->validate([
            'slug' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'content_md' => 'required|string',
            'content_md_en' => 'nullable|string',
            'sort_order' => 'integer|min:0',
            'xp_reward' => 'integer|min:0',
            'estimated_minutes' => 'integer|min:1',
        ]);

        $chapter->lessons()->create($validated);

        return redirect()->route('admin.chapters.lessons.index', $chapter);
    }

    public function edit(Lesson $lesson): Response
    {
        return Inertia::render('Admin/Lessons/Form', [
            'chapter' => $lesson->chapter->load('course'),
            'lesson' => $lesson,
        ]);
    }

    public function update(Request $request, Lesson $lesson): RedirectResponse
    {
        $validated = $request->validate([
            'slug' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'content_md' => 'required|string',
            'content_md_en' => 'nullable|string',
            'sort_order' => 'integer|min:0',
            'xp_reward' => 'integer|min:0',
            'estimated_minutes' => 'integer|min:1',
        ]);

        $lesson->update($validated);

        return redirect()->route('admin.chapters.lessons.index', $lesson->chapter_id);
    }

    public function destroy(Lesson $lesson): RedirectResponse
    {
        $chapterId = $lesson->chapter_id;
        $lesson->delete();

        return redirect()->route('admin.chapters.lessons.index', $chapterId);
    }
}
