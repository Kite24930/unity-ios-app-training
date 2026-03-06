import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function AdminDashboard() {
    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

            <h1 className="text-2xl font-bold text-white mb-8">管理ダッシュボード</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link
                    href={route('admin.courses.index')}
                    className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 hover:border-purple-500/50 transition-colors"
                >
                    <div className="flex items-center gap-4">
                        <span className="text-3xl">📚</span>
                        <div>
                            <h2 className="text-lg font-semibold text-white">コース管理</h2>
                            <p className="text-sm text-gray-400">コース・チャプター・レッスンの作成・編集</p>
                        </div>
                    </div>
                </Link>
            </div>
        </AdminLayout>
    );
}
