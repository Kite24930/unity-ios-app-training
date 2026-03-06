import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { AdminChapter, AdminCourse } from '@/types';

interface Props {
    course: AdminCourse;
    chapters: AdminChapter[];
}

export default function ChaptersIndex({ course, chapters }: Props) {
    const handleDelete = (chapter: AdminChapter) => {
        if (confirm(`「${chapter.title}」を削除してもよろしいですか？関連するレッスンもすべて削除されます。`)) {
            router.delete(route('admin.chapters.destroy', chapter.id));
        }
    };

    return (
        <AdminLayout>
            <Head title={`チャプター管理: ${course.title}`} />

            <div className="flex items-center gap-4 mb-6">
                <Link href={route('admin.courses.index')} className="text-gray-400 hover:text-white">←</Link>
                <div>
                    <h1 className="text-2xl font-bold text-white">チャプター管理</h1>
                    <p className="text-sm text-gray-400">{course.icon} {course.title}</p>
                </div>
                <div className="ml-auto">
                    <Link
                        href={route('admin.courses.chapters.create', course.id)}
                        className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium transition-colors"
                    >
                        + 新規チャプター
                    </Link>
                </div>
            </div>

            <div className="rounded-xl border border-gray-800 bg-gray-900/50 overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-800">
                            <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">順序</th>
                            <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">チャプター</th>
                            <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">レッスン数</th>
                            <th className="text-right px-4 py-3 text-sm font-medium text-gray-400">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chapters.map((chapter) => (
                            <tr key={chapter.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                                <td className="px-4 py-3 text-sm text-gray-400">{chapter.sort_order}</td>
                                <td className="px-4 py-3">
                                    <div className="text-sm font-medium text-white">{chapter.title}</div>
                                    {chapter.title_en && (
                                        <div className="text-xs text-gray-500">{chapter.title_en}</div>
                                    )}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-400">{chapter.lessons_count ?? 0}</td>
                                <td className="px-4 py-3 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={route('admin.chapters.lessons.index', chapter.id)}
                                            className="px-3 py-1 text-xs rounded bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors"
                                        >
                                            レッスン
                                        </Link>
                                        <Link
                                            href={route('admin.chapters.edit', chapter.id)}
                                            className="px-3 py-1 text-xs rounded bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 transition-colors"
                                        >
                                            編集
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(chapter)}
                                            className="px-3 py-1 text-xs rounded bg-red-600/20 hover:bg-red-600/40 text-red-400 transition-colors"
                                        >
                                            削除
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {chapters.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                                    チャプターがありません
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
