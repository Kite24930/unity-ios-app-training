import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ProgressBar from '@/Components/ProgressBar';
import DifficultyBadge from '@/Components/DifficultyBadge';
import { useTranslation } from '@/i18n';
import { CourseCard } from '@/types';

interface Props {
    courses: CourseCard[];
}

export default function CoursesIndex({ courses }: Props) {
    const { auth } = usePage().props as any;
    const locale = auth?.user?.locale ?? 'ja';
    const { t } = useTranslation(locale);

    return (
        <AppLayout>
            <Head title={t('courses.title')} />

            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h1 className="text-3xl font-bold text-white mb-2">{t('courses.title')}</h1>
                    <p className="text-gray-400">
                        {locale === 'ja'
                            ? 'Unity を使った iOS ゲーム開発を基礎から応用まで学びましょう'
                            : 'Learn iOS game development with Unity from basics to advanced'}
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {courses.map((course) => (
                        <Link
                            key={course.id}
                            href={route('courses.show', course.slug)}
                            className="group relative flex flex-col rounded-2xl border border-gray-800 bg-gray-900/50 overflow-hidden hover:border-gray-700 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/5"
                        >
                            {/* Card Header */}
                            <div
                                className="h-2"
                                style={{ backgroundColor: course.color }}
                            />
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-start justify-between mb-4">
                                    <span className="text-4xl">{course.icon}</span>
                                    <DifficultyBadge difficulty={course.difficulty} locale={locale} />
                                </div>

                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                                    {course.title}
                                </h3>
                                <p className="text-sm text-gray-400 mb-4 flex-1 line-clamp-3">
                                    {course.description}
                                </p>

                                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                                    <span>⏱ {course.estimated_hours} {t('courses.hours')}</span>
                                    <span>📖 {course.total_lessons} {t('courses.lessons')}</span>
                                </div>

                                {auth?.user && (
                                    <div>
                                        <ProgressBar
                                            progress={course.progress}
                                            color={course.color}
                                            size="sm"
                                            showLabel={false}
                                        />
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="text-xs text-gray-500">
                                                {course.completed_lessons}/{course.total_lessons} {t('courses.lessons')}
                                            </span>
                                            <span className="text-xs font-medium" style={{ color: course.color }}>
                                                {course.progress === 100
                                                    ? t('courses.completed')
                                                    : course.progress > 0
                                                        ? t('courses.continue')
                                                        : t('courses.start')}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
