<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Chapter extends Model
{
    protected $fillable = [
        'course_id', 'slug', 'title', 'title_en', 'description', 'description_en', 'sort_order',
    ];

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function lessons(): HasMany
    {
        return $this->hasMany(Lesson::class)->orderBy('sort_order');
    }

    public function getLocalizedTitle(string $locale = 'ja'): string
    {
        return $locale === 'en' && $this->title_en ? $this->title_en : $this->title;
    }
}
