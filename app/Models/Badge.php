<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Badge extends Model
{
    protected $fillable = [
        'slug', 'name', 'name_en', 'description', 'description_en',
        'icon', 'color', 'type', 'criteria',
    ];

    protected $casts = [
        'criteria' => 'array',
    ];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_badges')->withTimestamps();
    }

    public function getLocalizedName(string $locale = 'ja'): string
    {
        return $locale === 'en' && $this->name_en ? $this->name_en : $this->name;
    }
}
