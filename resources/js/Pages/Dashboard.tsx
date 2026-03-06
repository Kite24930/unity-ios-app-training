import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ProgressBar from '@/Components/ProgressBar';
import { useTranslation } from '@/i18n';
import { DashboardStats, CourseProgress, RecentCompletion, BadgeInfo } from '@/types';

interface Props {
    stats: DashboardStats;
    courseProgress: CourseProgress[];
    recentCompletions: RecentCompletion[];
    badges: BadgeInfo[];
}

export default function Dashboard({ stats, courseProgress, recentCompletions, badges }: Props) {
    const { auth } = usePage().props as any;
    const locale = auth?.user?.locale ?? 'ja';
    const { t } = useTranslation(locale);

    return (
        <AppLayout>
            <Head title={t('dashboard.title')} />

            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-white mb-8">{t('dashboard.title')}</h1>

                {/* Stats Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
                    {/* Level */}
                    <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-gray-400">{t('dashboard.level')}</span>
                            <span className="text-2xl">⭐</span>
                        </div>
                        <div className="text-3xl font-bold text-white mb-2">Lv.{stats.level}</div>
                        <ProgressBar
                            progress={stats.xp_for_current_level}
                            color="#8b5cf6"
                            size="sm"
                            showLabel={false}
                        />
                        <div className="text-xs text-gray-500 mt-1">
                            {stats.xp_for_current_level}/100 XP
                        </div>
                    </div>

                    {/* Total XP */}
                    <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-gray-400">{t('dashboard.total_xp')}</span>
                            <span className="text-2xl">⚡</span>
                        </div>
                        <div className="text-3xl font-bold text-yellow-400">{stats.total_xp}</div>
                        <div className="text-xs text-gray-500 mt-1">XP</div>
                    </div>

                    {/* Streak */}
                    <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-gray-400">{t('dashboard.streak')}</span>
                            <span className="text-2xl">🔥</span>
                        </div>
                        <div className="text-3xl font-bold text-orange-400">{stats.current_streak}</div>
                        <div className="text-xs text-gray-500 mt-1">{t('dashboard.streak_days')}</div>
                    </div>

                    {/* Overall Progress */}
                    <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-gray-400">{t('dashboard.progress')}</span>
                            <span className="text-2xl">📊</span>
                        </div>
                        <div className="text-3xl font-bold text-cyan-400">{stats.overall_progress}%</div>
                        <div className="text-xs text-gray-500 mt-1">
                            {stats.total_completed}/{stats.total_lessons} {locale === 'ja' ? 'レッスン' : 'lessons'}
                        </div>
                    </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Course Progress */}
                    <div className="lg:col-span-2">
                        <h2 className="text-xl font-bold text-white mb-4">{t('dashboard.course_progress')}</h2>
                        <div className="space-y-4">
                            {courseProgress.map((cp) => (
                                <Link
                                    key={cp.slug}
                                    href={route('courses.show', cp.slug)}
                                    className="flex items-center gap-4 rounded-xl border border-gray-800 bg-gray-900/50 p-5 hover:border-gray-700 transition-colors"
                                >
                                    <span className="text-3xl">{cp.icon}</span>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium text-white mb-1">{cp.title}</div>
                                        <ProgressBar progress={cp.progress} color={cp.color} size="sm" showLabel={false} />
                                        <div className="text-xs text-gray-500 mt-1">
                                            {cp.completed_lessons}/{cp.total_lessons} {locale === 'ja' ? 'レッスン完了' : 'lessons completed'}
                                        </div>
                                    </div>
                                    <span className="text-lg font-bold" style={{ color: cp.color }}>
                                        {cp.progress}%
                                    </span>
                                </Link>
                            ))}
                            {courseProgress.length === 0 && (
                                <div className="text-center py-10 text-gray-500">
                                    <p className="text-lg mb-2">{t('dashboard.start_learning')}</p>
                                    <Link href={route('courses.index')} className="text-purple-400 hover:text-purple-300">
                                        {t('nav.courses')} →
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        {/* Badges */}
                        <div>
                            <h2 className="text-xl font-bold text-white mb-4">{t('dashboard.badges')}</h2>
                            <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-5">
                                {badges.length > 0 ? (
                                    <div className="grid grid-cols-3 gap-3">
                                        {badges.map((badge, i) => (
                                            <div
                                                key={i}
                                                className="flex flex-col items-center gap-1 p-3 rounded-lg bg-gray-800/50"
                                                title={badge.name}
                                            >
                                                <span className="text-3xl">{badge.icon}</span>
                                                <span className="text-xs text-gray-400 text-center truncate w-full">{badge.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500 text-center py-4">
                                        {t('dashboard.no_badges')}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div>
                            <h2 className="text-xl font-bold text-white mb-4">{t('dashboard.recent')}</h2>
                            <div className="rounded-xl border border-gray-800 bg-gray-900/50 divide-y divide-gray-800/50">
                                {recentCompletions.length > 0 ? (
                                    recentCompletions.map((item, i) => (
                                        <div key={i} className="p-4">
                                            <div className="text-sm text-white mb-1">{item.lesson_title}</div>
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-gray-500">{item.course_title}</span>
                                                <span className="text-yellow-400">+{item.xp_earned} XP</span>
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">{item.completed_at}</div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-4 text-sm text-gray-500 text-center">
                                        {t('dashboard.start_learning')}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
