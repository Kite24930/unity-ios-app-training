<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lesson_completions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('lesson_id')->constrained()->cascadeOnDelete();
            $table->integer('xp_earned')->default(0);
            $table->timestamps();

            $table->unique(['user_id', 'lesson_id']);
        });

        Schema::create('badges', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('name_en')->nullable();
            $table->text('description');
            $table->text('description_en')->nullable();
            $table->string('icon')->default('🏆');
            $table->string('color')->default('#f59e0b');
            $table->enum('type', ['course_complete', 'chapter_complete', 'streak', 'xp_milestone', 'special'])->default('special');
            $table->json('criteria')->nullable();
            $table->timestamps();
        });

        Schema::create('user_badges', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('badge_id')->constrained()->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['user_id', 'badge_id']);
        });

        // Add XP and streak fields to users
        Schema::table('users', function (Blueprint $table) {
            $table->integer('total_xp')->default(0)->after('remember_token');
            $table->integer('current_streak')->default(0)->after('total_xp');
            $table->date('last_activity_date')->nullable()->after('current_streak');
            $table->string('locale')->default('ja')->after('last_activity_date');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['total_xp', 'current_streak', 'last_activity_date', 'locale']);
        });
        Schema::dropIfExists('user_badges');
        Schema::dropIfExists('badges');
        Schema::dropIfExists('lesson_completions');
    }
};
