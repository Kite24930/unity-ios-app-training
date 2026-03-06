import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function AdminLayout({ children }: PropsWithChildren) {
    const { auth } = usePage().props as any;
    const user = auth?.user;

    return (
        <div className="min-h-screen bg-gray-950 text-white flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col fixed inset-y-0 left-0">
                <div className="p-4 border-b border-gray-800">
                    <Link href={route('admin.dashboard')} className="flex items-center gap-2">
                        <span className="text-xl">🎮</span>
                        <span className="font-bold text-white">Unity Quest</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-purple-600 text-white font-semibold">Admin</span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <Link
                        href={route('admin.dashboard')}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                    >
                        <span>📊</span>
                        <span>ダッシュボード</span>
                    </Link>
                    <Link
                        href={route('admin.courses.index')}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                    >
                        <span>📚</span>
                        <span>コース管理</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <Link
                        href={route('home')}
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        <span>←</span>
                        <span>サイトに戻る</span>
                    </Link>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 ml-64">
                <header className="sticky top-0 z-10 border-b border-gray-800 bg-gray-900/95 backdrop-blur px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div />
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-400">{user?.name}</span>
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-xs font-bold">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    </div>
                </header>

                <main className="p-6">{children}</main>
            </div>
        </div>
    );
}
