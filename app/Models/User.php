<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    protected $fillable = [
        'name', 'email', 'password', 'total_xp', 'current_streak', 'last_activity_date', 'locale',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'last_activity_date' => 'date',
        ];
    }

    public function completions(): HasMany
    {
        return $this->hasMany(LessonCompletion::class);
    }

    public function badges(): BelongsToMany
    {
        return $this->belongsToMany(Badge::class, 'user_badges')->withTimestamps();
    }

    public function hasCompletedLesson(int $lessonId): bool
    {
        return $this->completions()->where('lesson_id', $lessonId)->exists();
    }

    public function getLevel(): int
    {
        return (int) floor($this->total_xp / 100) + 1;
    }

    public function getXpForCurrentLevel(): int
    {
        return $this->total_xp % 100;
    }
}
