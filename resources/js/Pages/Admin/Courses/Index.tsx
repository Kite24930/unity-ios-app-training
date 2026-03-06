import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { AdminCourse } from '@/types';

interface Props {
    courses: AdminCourse[];
}

export default function CoursesIndex({ courses }: Props) {
    const handleDelete = (course: AdminCourse) => {
        if (confirm(`「${course.title}」を削除してもよろしいですか？関連するチャプター・レッスンもすべて削除されます。`)) {
            router.delete(route('admin.courses.destroy', course.id));
        }
    };

    return (
        <AdminLayout>
            <Head title="コース管理" />

            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-white">コース管理</h1>
                <Link
                    href={route('admin.courses.create')}
                    className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium transition-colors"
                >
                    + 新規コース
                </Link>
            </div>

            <div className="rounded-xl border border-gray-800 bg-gray-900/50 overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-800">
                            <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">順序</th>
                            <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">コース</th>
                            <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">難易度</th>
                            <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">レッスン数</th>
                            <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">公開</th>
                            <th className="text-right px-4 py-3 text-sm font-medium text-gray-400">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course) => (
                            <tr key={course.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                                <td className="px-4 py-3 text-sm text-gray-400">{course.sort_order}</td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl">{course.icon}</span>
                                        <div>
                                            <div className="text-sm font-medium text-white">{course.title}</div>
                                            {course.title_en && (
                                                <div className="text-xs text-gray-500">{course.title_en}</div>
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`text-xs px-2 py-1 rounded-full ${
                                        course.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' :
                                        course.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                                        'bg-red-500/20 text-red-400'
                                    }`}>
                                        {course.difficulty === 'beginner' ? '初級' :
                                         course.difficulty === 'intermediate' ? '中級' : '上級'}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-400">{course.lessons_count ?? 0}</td>
                                <td className="px-4 py-3">
                                    <span className={`text-xs px-2 py-1 rounded-full ${
                                        course.is_published ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                                    }`}>
                                        {course.is_published ? '公開' : '下書き'}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={route('admin.courses.chapters.index', course.id)}
                                            className="px-3 py-1 text-xs rounded bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors"
                                        >
                                            チャプター
                                        </Link>
                                        <Link
                                            href={route('admin.courses.edit', course.id)}
                                            className="px-3 py-1 text-xs rounded bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 transition-colors"
                                        >
                                            編集
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(course)}
                                            className="px-3 py-1 text-xs rounded bg-red-600/20 hover:bg-red-600/40 text-red-400 transition-colors"
                                        >
                                            削除
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {courses.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                                    コースがありません
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
