<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Course extends Model
{
    protected $fillable = [
        'slug', 'title', 'title_en', 'description', 'description_en',
        'icon', 'color', 'sort_order', 'estimated_hours', 'difficulty', 'is_published',
    ];

    protected $casts = [
        'is_published' => 'boolean',
    ];

    public function chapters(): HasMany
    {
        return $this->hasMany(Chapter::class)->orderBy('sort_order');
    }

    public function lessons(): HasManyThrough
    {
        return $this->hasManyThrough(Lesson::class, Chapter::class);
    }

    public function getLocalizedTitle(string $locale = 'ja'): string
    {
        return $locale === 'en' && $this->title_en ? $this->title_en : $this->title;
    }

    public function getLocalizedDescription(string $locale = 'ja'): string
    {
        return $locale === 'en' && $this->description_en ? $this->description_en : $this->description;
    }

    public function getTotalLessonsAttribute(): int
    {
        return $this->lessons()->count();
    }
}
