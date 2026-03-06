import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import MarkdownRenderer from '@/Components/MarkdownRenderer';
import XpBadge from '@/Components/XpBadge';
import { useTranslation } from '@/i18n';
import { LessonDetail, LessonNav, SidebarChapter } from '@/types';
import { useState } from 'react';

interface Props {
    course: { slug: string; title: string; icon: string; color: string };
    chapter: { slug: string; title: string };
    lesson: LessonDetail;
    prevLesson: LessonNav | null;
    nextLesson: LessonNav | null;
    sidebarLessons: SidebarChapter[];
}

export default function LessonShow({ course, chapter, lesson, prevLesson, nextLesson, sidebarLessons }: Props) {
    const { auth } = usePage().props as any;
    const locale = auth?.user?.locale ?? 'ja';
    const { t } = useTranslation(locale);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [completing, setCompleting] = useState(false);

    const handleComplete = () => {
        if (!auth?.user || lesson.is_completed) return;
        setCompleting(true);
        router.post(route('lessons.complete', lesson.id), {}, {
            preserveScroll: true,
            onFinish: () => setCompleting(false),
        });
    };

    return (
        <AppLayout>
            <Head title={`${lesson.title} - ${course.title}`} />

            <div className="flex">
                {/* Sidebar */}
                <aside className={`fixed inset-y-16 left-0 z-40 w-80 bg-gray-900 border-r border-gray-800 overflow-y-auto transform transition-transform lg:translate-x-0 lg:static lg:inset-auto ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                    <div className="p-4 border-b border-gray-800">
                        <Link href={route('courses.show', course.slug)} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white">
                            <span>←</span>
                            <span>{course.icon} {course.title}</span>
                        </Link>
                    </div>
                    <nav className="p-4">
                        {sidebarLessons.map((ch) => (
                            <div key={ch.slug} className="mb-6">
                                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                    {ch.title}
                                </h3>
                                <ul className="space-y-1">
                                    {ch.lessons.map((l) => (
                                        <li key={l.id}>
                                            <Link
                                                href={route('lessons.show', [course.slug, ch.slug, l.slug])}
                                                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                                                    l.id === lesson.id
                                                        ? 'bg-purple-500/20 text-purple-300 font-medium'
                                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                                }`}
                                            >
                                                <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                                                    l.is_completed ? 'bg-green-500/30 text-green-400' : 'bg-gray-700 text-gray-500'
                                                }`}>
                                                    {l.is_completed ? '✓' : '○'}
                                                </span>
                                                <span className="truncate">{l.title}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </aside>

                {/* Overlay for mobile sidebar */}
                {sidebarOpen && (
                    <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
                )}

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                    {/* Mobile sidebar toggle */}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="lg:hidden fixed bottom-4 left-4 z-50 w-12 h-12 rounded-full bg-purple-600 text-white shadow-lg flex items-center justify-center"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                            <Link href={route('courses.show', course.slug)} className="hover:text-white">{course.title}</Link>
                            <span>/</span>
                            <span>{chapter.title}</span>
                        </div>

                        {/* Lesson Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-white mb-4">{lesson.title}</h1>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span>⏱ {lesson.estimated_minutes} {t('lesson.minutes')}</span>
                                <XpBadge xp={lesson.xp_reward} />
                                {lesson.is_completed && (
                                    <span className="text-green-400 font-medium">✓ {t('lesson.already_completed')}</span>
                                )}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="mb-12">
                            <MarkdownRenderer content={lesson.content} />
                        </div>

                        {/* Complete Button */}
                        {auth?.user && (
                            <div className="flex justify-center mb-12">
                                <button
                                    onClick={handleComplete}
                                    disabled={lesson.is_completed || completing}
                                    className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl text-lg font-semibold transition-all ${
                                        lesson.is_completed
                                            ? 'bg-green-500/20 text-green-400 border border-green-500/30 cursor-default'
                                            : 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105'
                                    }`}
                                >
                                    {lesson.is_completed ? (
                                        <>✓ {t('lesson.already_completed')}</>
                                    ) : completing ? (
                                        <>{t('common.loading')}</>
                                    ) : (
                                        <>🎯 {t('lesson.complete')} <span className="text-yellow-300">+{lesson.xp_reward} XP</span></>
                                    )}
                                </button>
                            </div>
                        )}

                        {/* Navigation */}
                        <div className="flex items-center justify-between border-t border-gray-800 pt-6">
                            {prevLesson ? (
                                <Link
                                    href={route('lessons.show', [prevLesson.course_slug, prevLesson.chapter_slug, prevLesson.slug])}
                                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                                >
                                    <span>←</span>
                                    <span>{t('lesson.prev')}</span>
                                </Link>
                            ) : (
                                <div />
                            )}
                            <Link
                                href={route('courses.show', course.slug)}
                                className="text-sm text-gray-400 hover:text-white"
                            >
                                {t('lesson.back_to_course')}
                            </Link>
                            {nextLesson ? (
                                <Link
                                    href={route('lessons.show', [nextLesson.course_slug, nextLesson.chapter_slug, nextLesson.slug])}
                                    className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors"
                                >
                                    <span>{t('lesson.next')}</span>
                                    <span>→</span>
                                </Link>
                            ) : (
                                <div />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
