import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ProgressBar from '@/Components/ProgressBar';
import DifficultyBadge from '@/Components/DifficultyBadge';
import XpBadge from '@/Components/XpBadge';
import { useTranslation } from '@/i18n';
import { CourseCard, ChapterWithLessons } from '@/types';

interface Props {
    course: CourseCard;
    chapters: ChapterWithLessons[];
}

export default function CourseShow({ course, chapters }: Props) {
    const { auth } = usePage().props as any;
    const locale = auth?.user?.locale ?? 'ja';
    const { t } = useTranslation(locale);

    return (
        <AppLayout>
            <Head title={course.title} />

            <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
                {/* Course Header */}
                <div className="mb-10">
                    <Link href={route('courses.index')} className="text-sm text-gray-400 hover:text-white mb-4 inline-block">
                        ← {t('courses.title')}
                    </Link>

                    <div className="flex items-start gap-6">
                        <span className="text-6xl">{course.icon}</span>
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-3xl font-bold text-white">{course.title}</h1>
                                <DifficultyBadge difficulty={course.difficulty} locale={locale} />
                            </div>
                            <p className="text-gray-400 mb-4">{course.description}</p>
                            <div className="flex items-center gap-6 text-sm text-gray-500">
                                <span>⏱ {course.estimated_hours} {t('courses.hours')}</span>
                                <span>📖 {course.total_lessons} {t('courses.lessons')}</span>
                            </div>
                            {auth?.user && (
                                <div className="mt-4 max-w-md">
                                    <ProgressBar progress={course.progress} color={course.color} size="md" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Chapters */}
                <div className="space-y-6">
                    {chapters.map((chapter, chapterIndex) => (
                        <div key={chapter.id} className="rounded-2xl border border-gray-800 bg-gray-900/50 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-800 bg-gray-900/80">
                                <h2 className="text-lg font-bold text-white">
                                    <span className="text-purple-400 mr-2">Chapter {chapterIndex + 1}</span>
                                    {chapter.title}
                                </h2>
                            </div>
                            <ul className="divide-y divide-gray-800/50">
                                {chapter.lessons.map((lesson, lessonIndex) => (
                                    <li key={lesson.id}>
                                        <Link
                                            href={route('lessons.show', [course.slug, chapter.slug, lesson.slug])}
                                            className="flex items-center gap-4 px-6 py-4 hover:bg-gray-800/50 transition-colors group"
                                        >
                                            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                                lesson.is_completed
                                                    ? 'bg-green-500/20 text-green-400'
                                                    : 'bg-gray-700/50 text-gray-400 group-hover:bg-purple-500/20 group-hover:text-purple-400'
                                            }`}>
                                                {lesson.is_completed ? '✓' : lessonIndex + 1}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors">
                                                    {lesson.title}
                                                </div>
                                                <div className="text-xs text-gray-500 mt-0.5">
                                                    ⏱ {lesson.estimated_minutes} {t('lesson.minutes')}
                                                </div>
                                            </div>
                                            <XpBadge xp={lesson.xp_reward} />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
