import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { AdminLesson, AdminChapter, AdminCourse } from '@/types';

interface Props {
    chapter: AdminChapter & { course: AdminCourse };
    lessons: AdminLesson[];
}

export default function LessonsIndex({ chapter, lessons }: Props) {
    const handleDelete = (lesson: AdminLesson) => {
        if (confirm(`「${lesson.title}」を削除してもよろしいですか？`)) {
            router.delete(route('admin.lessons.destroy', lesson.id));
        }
    };

    return (
        <AdminLayout>
            <Head title={`レッスン管理: ${chapter.title}`} />

            <div className="flex items-center gap-4 mb-6">
                <Link href={route('admin.courses.chapters.index', chapter.course_id)} className="text-gray-400 hover:text-white">←</Link>
                <div>
                    <h1 className="text-2xl font-bold text-white">レッスン管理</h1>
                    <p className="text-sm text-gray-400">
                        {chapter.course.icon} {chapter.course.title} / {chapter.title}
                    </p>
                </div>
                <div className="ml-auto">
                    <Link
                        href={route('admin.chapters.lessons.create', chapter.id)}
                        className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium transition-colors"
                    >
                        + 新規レッスン
                    </Link>
                </div>
            </div>

            <div className="rounded-xl border border-gray-800 bg-gray-900/50 overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-800">
                            <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">順序</th>
                            <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">レッスン</th>
                            <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">XP</th>
                            <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">時間</th>
                            <th className="text-right px-4 py-3 text-sm font-medium text-gray-400">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lessons.map((lesson) => (
                            <tr key={lesson.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                                <td className="px-4 py-3 text-sm text-gray-400">{lesson.sort_order}</td>
                                <td className="px-4 py-3">
                                    <div className="text-sm font-medium text-white">{lesson.title}</div>
                                    {lesson.title_en && (
                                        <div className="text-xs text-gray-500">{lesson.title_en}</div>
                                    )}
                                </td>
                                <td className="px-4 py-3 text-sm text-yellow-400">{lesson.xp_reward} XP</td>
                                <td className="px-4 py-3 text-sm text-gray-400">{lesson.estimated_minutes}分</td>
                                <td className="px-4 py-3 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={route('admin.lessons.edit', lesson.id)}
                                            className="px-3 py-1 text-xs rounded bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 transition-colors"
                                        >
                                            編集
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(lesson)}
                                            className="px-3 py-1 text-xs rounded bg-red-600/20 hover:bg-red-600/40 text-red-400 transition-colors"
                                        >
                                            削除
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {lessons.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                                    レッスンがありません
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
