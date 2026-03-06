<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Lesson extends Model
{
    protected $fillable = [
        'chapter_id', 'slug', 'title', 'title_en', 'content_md', 'content_md_en',
        'sort_order', 'xp_reward', 'estimated_minutes',
    ];

    public function chapter(): BelongsTo
    {
        return $this->belongsTo(Chapter::class);
    }

    public function getLocalizedTitle(string $locale = 'ja'): string
    {
        return $locale === 'en' && $this->title_en ? $this->title_en : $this->title;
    }

    public function getLocalizedContent(string $locale = 'ja'): string
    {
        return $locale === 'en' && $this->content_md_en ? $this->content_md_en : $this->content_md;
    }
}
