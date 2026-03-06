import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { AdminChapter, AdminCourse } from '@/types';
import { FormEvent } from 'react';

interface Props {
    course: AdminCourse;
    chapter?: AdminChapter;
}

export default function ChapterForm({ course, chapter }: Props) {
    const isEdit = !!chapter;

    const { data, setData, post, put, processing, errors } = useForm({
        slug: chapter?.slug ?? '',
        title: chapter?.title ?? '',
        title_en: chapter?.title_en ?? '',
        description: chapter?.description ?? '',
        description_en: chapter?.description_en ?? '',
        sort_order: chapter?.sort_order ?? 0,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.chapters.update', chapter!.id));
        } else {
            post(route('admin.courses.chapters.store', course.id));
        }
    };

    return (
        <AdminLayout>
            <Head title={isEdit ? `編集: ${chapter!.title}` : '新規チャプター'} />

            <div className="max-w-3xl">
                <div className="flex items-center gap-4 mb-6">
                    <Link href={route('admin.courses.chapters.index', course.id)} className="text-gray-400 hover:text-white">←</Link>
                    <div>
                        <h1 className="text-2xl font-bold text-white">
                            {isEdit ? `チャプター編集: ${chapter!.title}` : '新規チャプター作成'}
                        </h1>
                        <p className="text-sm text-gray-400">{course.icon} {course.title}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Slug</label>
                                <input
                                    type="text"
                                    value={data.slug}
                                    onChange={e => setData('slug', e.target.value)}
                                    className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm focus:border-purple-500 focus:ring-purple-500"
                                    placeholder="chapter-1"
                                />
                                {errors.slug && <p className="text-red-400 text-xs mt-1">{errors.slug}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">表示順</label>
                                <input
                                    type="number"
                                    value={data.sort_order}
                                    onChange={e => setData('sort_order', parseInt(e.target.value) || 0)}
                                    className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm focus:border-purple-500 focus:ring-purple-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">タイトル（日本語）</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm focus:border-purple-500 focus:ring-purple-500"
                            />
                            {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">タイトル（English）</label>
                            <input
                                type="text"
                                value={data.title_en}
                                onChange={e => setData('title_en', e.target.value)}
                                className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm focus:border-purple-500 focus:ring-purple-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">説明（日本語）</label>
                            <textarea
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                rows={3}
                                className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm focus:border-purple-500 focus:ring-purple-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">説明（English）</label>
                            <textarea
                                value={data.description_en}
                                onChange={e => setData('description_en', e.target.value)}
                                rows={3}
                                className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm focus:border-purple-500 focus:ring-purple-500"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium transition-colors disabled:opacity-50"
                        >
                            {processing ? '保存中...' : '保存'}
                        </button>
                        <Link
                            href={route('admin.courses.chapters.index', course.id)}
                            className="px-6 py-2 rounded-lg border border-gray-700 text-gray-300 hover:text-white text-sm transition-colors"
                        >
                            キャンセル
                        </Link>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
