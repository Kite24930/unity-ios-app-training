import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { AdminCourse } from '@/types';
import { FormEvent } from 'react';

interface Props {
    course?: AdminCourse;
}

export default function CourseForm({ course }: Props) {
    const isEdit = !!course;

    const { data, setData, post, put, processing, errors } = useForm({
        slug: course?.slug ?? '',
        title: course?.title ?? '',
        title_en: course?.title_en ?? '',
        description: course?.description ?? '',
        description_en: course?.description_en ?? '',
        icon: course?.icon ?? '📘',
        color: course?.color ?? '#6366f1',
        sort_order: course?.sort_order ?? 0,
        estimated_hours: course?.estimated_hours ?? 1,
        difficulty: course?.difficulty ?? 'beginner' as const,
        is_published: course?.is_published ?? false,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.courses.update', course!.id));
        } else {
            post(route('admin.courses.store'));
        }
    };

    return (
        <AdminLayout>
            <Head title={isEdit ? `編集: ${course!.title}` : '新規コース'} />

            <div className="max-w-3xl">
                <div className="flex items-center gap-4 mb-6">
                    <Link href={route('admin.courses.index')} className="text-gray-400 hover:text-white">←</Link>
                    <h1 className="text-2xl font-bold text-white">
                        {isEdit ? `コース編集: ${course!.title}` : '新規コース作成'}
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 space-y-4">
                        <h2 className="text-lg font-semibold text-white mb-4">基本情報</h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Slug</label>
                                <input
                                    type="text"
                                    value={data.slug}
                                    onChange={e => setData('slug', e.target.value)}
                                    className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm focus:border-purple-500 focus:ring-purple-500"
                                    placeholder="unity-basics"
                                />
                                {errors.slug && <p className="text-red-400 text-xs mt-1">{errors.slug}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">難易度</label>
                                <select
                                    value={data.difficulty}
                                    onChange={e => setData('difficulty', e.target.value as any)}
                                    className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm focus:border-purple-500 focus:ring-purple-500"
                                >
                                    <option value="beginner">初級</option>
                                    <option value="intermediate">中級</option>
                                    <option value="advanced">上級</option>
                                </select>
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
                            {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
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

                        <div className="grid grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">アイコン</label>
                                <input
                                    type="text"
                                    value={data.icon}
                                    onChange={e => setData('icon', e.target.value)}
                                    className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm focus:border-purple-500 focus:ring-purple-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">カラー</label>
                                <input
                                    type="color"
                                    value={data.color}
                                    onChange={e => setData('color', e.target.value)}
                                    className="w-full h-10 rounded-lg bg-gray-800 border border-gray-700 cursor-pointer"
                                />
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
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">想定時間(h)</label>
                                <input
                                    type="number"
                                    value={data.estimated_hours}
                                    onChange={e => setData('estimated_hours', parseInt(e.target.value) || 0)}
                                    className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm focus:border-purple-500 focus:ring-purple-500"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.is_published}
                                    onChange={e => setData('is_published', e.target.checked)}
                                    className="rounded bg-gray-800 border-gray-700 text-purple-600 focus:ring-purple-500"
                                />
                                <span className="text-sm text-gray-300">公開する</span>
                            </label>
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
                            href={route('admin.courses.index')}
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
