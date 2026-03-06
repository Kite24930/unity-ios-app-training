<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::get('/courses', [CourseController::class, 'index'])->name('courses.index');
Route::get('/courses/{courseSlug}', [CourseController::class, 'show'])->name('courses.show');
Route::get('/courses/{courseSlug}/{chapterSlug}/{lessonSlug}', [LessonController::class, 'show'])->name('lessons.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::post('/lessons/{lessonId}/complete', [LessonController::class, 'complete'])->name('lessons.complete');

    Route::post('/locale', function (\Illuminate\Http\Request $request) {
        $request->validate(['locale' => 'required|in:ja,en']);
        $request->user()->update(['locale' => $request->locale]);
        return back();
    })->name('locale.update');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
