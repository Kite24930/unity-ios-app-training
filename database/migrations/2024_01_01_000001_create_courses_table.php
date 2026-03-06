<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('title_en')->nullable();
            $table->text('description');
            $table->text('description_en')->nullable();
            $table->string('icon')->default('📘');
            $table->string('color')->default('#6366f1');
            $table->integer('sort_order')->default(0);
            $table->integer('estimated_hours')->default(0);
            $table->enum('difficulty', ['beginner', 'intermediate', 'advanced'])->default('beginner');
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });

        Schema::create('chapters', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained()->cascadeOnDelete();
            $table->string('slug');
            $table->string('title');
            $table->string('title_en')->nullable();
            $table->text('description')->nullable();
            $table->text('description_en')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();

            $table->unique(['course_id', 'slug']);
        });

        Schema::create('lessons', function (Blueprint $table) {
            $table->id();
            $table->foreignId('chapter_id')->constrained()->cascadeOnDelete();
            $table->string('slug');
            $table->string('title');
            $table->string('title_en')->nullable();
            $table->longText('content_md');
            $table->longText('content_md_en')->nullable();
            $table->integer('sort_order')->default(0);
            $table->integer('xp_reward')->default(10);
            $table->integer('estimated_minutes')->default(15);
            $table->timestamps();

            $table->unique(['chapter_id', 'slug']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lessons');
        Schema::dropIfExists('chapters');
        Schema::dropIfExists('courses');
    }
};
