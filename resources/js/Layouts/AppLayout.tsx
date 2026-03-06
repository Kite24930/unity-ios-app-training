import { Link, router, usePage } from '@inertiajs/react';
import { PropsWithChildren, useState } from 'react';
import { useTranslation } from '@/i18n';

export default function AppLayout({ children }: PropsWithChildren) {
    const { auth } = usePage().props as any;
    const user = auth?.user;
    const locale = user?.locale ?? 'ja';
    const { t } = useTranslation(locale);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const toggleLocale = () => {
        if (user) {
            router.post(route('locale.update'), { locale: locale === 'ja' ? 'en' : 'ja' });
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            {/* Header */}
            <nav className="sticky top-0 z-50 border-b border-gray-800 bg-gray-900/95 backdrop-blur">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center gap-8">
                            <Link href={route('home')} className="flex items-center gap-2">
                                <span className="text-2xl">🎮</span>
                                <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                                    Unity Quest
                                </span>
                            </Link>
                            <div className="hidden md:flex items-center gap-6">
                                <Link
                                    href={route('courses.index')}
                                    className="text-sm text-gray-300 hover:text-white transition-colors"
                                >
                                    {t('nav.courses')}
                                </Link>
                                {user && (
                                    <Link
                                        href={route('dashboard')}
                                        className="text-sm text-gray-300 hover:text-white transition-colors"
                                    >
                                        {t('nav.dashboard')}
                                    </Link>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            {user && (
                                <>
                                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30">
                                        <span className="text-yellow-400 text-sm">⚡</span>
                                        <span className="text-sm font-medium text-purple-300">{user.total_xp} XP</span>
                                    </div>
                                    <button
                                        onClick={toggleLocale}
                                        className="px-2 py-1 text-xs rounded border border-gray-600 text-gray-400 hover:text-white hover:border-gray-400 transition-colors"
                                    >
                                        {locale === 'ja' ? 'EN' : '日本語'}
                                    </button>
                                </>
                            )}

                            {user ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                                        className="flex items-center gap-2 text-sm text-gray-300 hover:text-white"
                                    >
                                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-xs font-bold">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                    </button>
                                    {userMenuOpen && (
                                        <>
                                            <div className="fixed inset-0" onClick={() => setUserMenuOpen(false)} />
                                            <div className="absolute right-0 mt-2 w-48 rounded-lg bg-gray-800 border border-gray-700 shadow-lg py-1">
                                                <Link href={route('profile.edit')} className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                                                    {t('nav.profile')}
                                                </Link>
                                                <Link href={route('logout')} method="post" as="button" className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                                                    {t('nav.logout')}
                                                </Link>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <Link href={route('login')} className="text-sm text-gray-300 hover:text-white">
                                        {t('nav.login')}
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="text-sm px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors"
                                    >
                                        {t('nav.register')}
                                    </Link>
                                </div>
                            )}

                            <button
                                className="md:hidden text-gray-400 hover:text-white"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {mobileMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-800 bg-gray-900 pb-3 pt-2 px-4">
                        <Link href={route('courses.index')} className="block py-2 text-gray-300">{t('nav.courses')}</Link>
                        {user && <Link href={route('dashboard')} className="block py-2 text-gray-300">{t('nav.dashboard')}</Link>}
                    </div>
                )}
            </nav>

            <main>{children}</main>

            {/* Footer */}
            <footer className="border-t border-gray-800 bg-gray-900 mt-20">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-xl">🎮</span>
                            <span className="font-bold text-gray-400">Unity Quest</span>
                        </div>
                        <p className="text-sm text-gray-500">
                            Unity iOS Game Development Learning Platform
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
