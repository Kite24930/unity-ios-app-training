import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { useTranslation } from '@/i18n';

export default function Welcome() {
    const { auth } = usePage().props as any;
    const locale = auth?.user?.locale ?? 'ja';
    const { t } = useTranslation(locale);

    const features = [
        {
            icon: '🔄',
            title: t('welcome.feature1.title'),
            description: t('welcome.feature1.desc'),
            gradient: 'from-purple-500 to-blue-500',
        },
        {
            icon: '🏆',
            title: t('welcome.feature2.title'),
            description: t('welcome.feature2.desc'),
            gradient: 'from-yellow-500 to-orange-500',
        },
        {
            icon: '🚀',
            title: t('welcome.feature3.title'),
            description: t('welcome.feature3.desc'),
            gradient: 'from-cyan-500 to-green-500',
        },
    ];

    const techComparisons = [
        { web: 'Laravel Controller', unity: 'MonoBehaviour Script', icon: '📋' },
        { web: 'React Component', unity: 'Unity Prefab', icon: '🧩' },
        { web: 'CSS / Tailwind', unity: 'Unity Material / Shader', icon: '🎨' },
        { web: 'npm / Composer', unity: 'Unity Package Manager', icon: '📦' },
        { web: 'REST API', unity: 'Unity Networking / Mirror', icon: '🌐' },
        { web: 'MySQL / PostgreSQL', unity: 'PlayerPrefs / JSON Save', icon: '💾' },
    ];

    return (
        <AppLayout>
            <Head title={t('welcome.title')} />

            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-gray-950 to-cyan-900/20" />
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
                </div>

                <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
                    <div className="text-center">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2">
                            <span className="text-sm text-purple-300">🎮 Web Developer → Game Developer</span>
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
                            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                                {t('welcome.title')}
                            </span>
                        </h1>
                        <p className="mt-4 text-xl text-purple-300 font-medium">
                            {t('welcome.subtitle')}
                        </p>
                        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
                            {t('welcome.description')}
                        </p>
                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href={auth?.user ? route('dashboard') : route('register')}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all hover:scale-105"
                            >
                                🚀 {t('welcome.start')}
                            </Link>
                            <Link
                                href={route('courses.index')}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-gray-600 px-8 py-4 text-lg font-semibold text-gray-300 hover:border-gray-400 hover:text-white transition-all"
                            >
                                📚 {t('welcome.view_courses')}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                <div className="grid gap-8 md:grid-cols-3">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="group relative rounded-2xl border border-gray-800 bg-gray-900/50 p-8 hover:border-gray-700 transition-all hover:-translate-y-1"
                        >
                            <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6 text-2xl`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Tech Comparison */}
            <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        {locale === 'ja' ? 'Web開発の知識がそのまま活きる' : 'Your Web Skills Transfer Directly'}
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        {locale === 'ja'
                            ? '普段使っている技術と Unity の対応関係を理解すれば、学習がぐっと楽になります'
                            : 'Understanding how your current tech maps to Unity concepts makes learning much easier'}
                    </p>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {techComparisons.map((item) => (
                        <div
                            key={item.web}
                            className="flex items-center gap-4 rounded-xl border border-gray-800 bg-gray-900/50 p-5 hover:border-purple-500/30 transition-colors"
                        >
                            <span className="text-2xl">{item.icon}</span>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm text-gray-400">{item.web}</div>
                                <div className="text-purple-400 text-xs my-1">→</div>
                                <div className="text-sm font-medium text-white">{item.unity}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900/50 to-cyan-900/50 border border-purple-500/20 p-12 text-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-cyan-500/5" />
                    <div className="relative">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            {locale === 'ja' ? '今すぐ冒険を始めよう' : 'Start Your Adventure Now'}
                        </h2>
                        <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                            {locale === 'ja'
                                ? '無料で登録して、Unityを使ったiOSゲーム開発の世界に飛び込みましょう'
                                : 'Register for free and dive into the world of iOS game development with Unity'}
                        </p>
                        <Link
                            href={auth?.user ? route('courses.index') : route('register')}
                            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-gray-900 hover:bg-gray-100 transition-colors"
                        >
                            🎮 {locale === 'ja' ? 'はじめる' : 'Get Started'}
                        </Link>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
