import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import MarkdownRenderer from '@/Components/MarkdownRenderer';
import { AdminLesson, AdminChapter, AdminCourse } from '@/types';
import { FormEvent, useRef, useState } from 'react';

interface Props {
    chapter: AdminChapter & { course: AdminCourse };
    lesson?: AdminLesson;
}

function insertAtCursor(textarea: HTMLTextAreaElement, before: string, after: string = '') {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = textarea.value.substring(start, end);
    const replacement = before + (selected || 'text') + after;
    const newValue = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);

    // Return new value and cursor position
    return {
        value: newValue,
        cursorStart: start + before.length,
        cursorEnd: start + before.length + (selected || 'text').length,
    };
}

export default function LessonForm({ chapter, lesson }: Props) {
    const isEdit = !!lesson;
    const [activeTab, setActiveTab] = useState<'ja' | 'en'>('ja');
    const [uploading, setUploading] = useState(false);
    const textareaJaRef = useRef<HTMLTextAreaElement>(null);
    const textareaEnRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, put, processing, errors } = useForm({
        slug: lesson?.slug ?? '',
        title: lesson?.title ?? '',
        title_en: lesson?.title_en ?? '',
        content_md: lesson?.content_md ?? '',
        content_md_en: lesson?.content_md_en ?? '',
        sort_order: lesson?.sort_order ?? 0,
        xp_reward: lesson?.xp_reward ?? 10,
        estimated_minutes: lesson?.estimated_minutes ?? 15,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.lessons.update', lesson!.id));
        } else {
            post(route('admin.chapters.lessons.store', chapter.id));
        }
    };

    const getActiveTextarea = () => activeTab === 'ja' ? textareaJaRef.current : textareaEnRef.current;
    const getActiveField = () => activeTab === 'ja' ? 'content_md' : 'content_md_en';

    const handleToolbar = (before: string, after: string = '') => {
        const textarea = getActiveTextarea();
        if (!textarea) return;
        const result = insertAtCursor(textarea, before, after);
        setData(getActiveField() as any, result.value);
        requestAnimationFrame(() => {
            textarea.focus();
            textarea.setSelectionRange(result.cursorStart, result.cursorEnd);
        });
    };

    const handleImageUpload = async (file: File) => {
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('image', file);

            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            const response = await fetch(route('admin.images.store'), {
                method: 'POST',
                headers: { 'X-CSRF-TOKEN': csrfToken || '' },
                body: formData,
            });

            if (!response.ok) throw new Error('Upload failed');

            const { markdown } = await response.json();
            const textarea = getActiveTextarea();
            if (textarea) {
                const pos = textarea.selectionStart;
                const currentValue = activeTab === 'ja' ? data.content_md : data.content_md_en;
                const newValue = currentValue.substring(0, pos) + '\n' + markdown + '\n' + currentValue.substring(pos);
                setData(getActiveField() as any, newValue);
            }
        } catch (err) {
            alert('画像のアップロードに失敗しました');
        } finally {
            setUploading(false);
        }
    };

    const currentContent = activeTab === 'ja' ? data.content_md : data.content_md_en;

    return (
        <AdminLayout>
            <Head title={isEdit ? `編集: ${lesson!.title}` : '新規レッスン'} />

            <div className="flex items-center gap-4 mb-6">
                <Link href={route('admin.chapters.lessons.index', chapter.id)} className="text-gray-400 hover:text-white">←</Link>
                <div>
                    <h1 className="text-2xl font-bold text-white">
                        {isEdit ? `レッスン編集: ${lesson!.title}` : '新規レッスン作成'}
                    </h1>
                    <p className="text-sm text-gray-400">
                        {chapter.course.icon} {chapter.course.title} / {chapter.title}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic info */}
                <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 space-y-4">
                    <h2 className="text-lg font-semibold text-white">基本情報</h2>

                    <div className="grid grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Slug</label>
                            <input
                                type="text"
                                value={data.slug}
                                onChange={e => setData('slug', e.target.value)}
                                className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm focus:border-purple-500 focus:ring-purple-500"
                                placeholder="lesson-1"
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
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">XP報酬</label>
                            <input
                                type="number"
                                value={data.xp_reward}
                                onChange={e => setData('xp_reward', parseInt(e.target.value) || 0)}
                                className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm focus:border-purple-500 focus:ring-purple-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">想定時間(分)</label>
                            <input
                                type="number"
                                value={data.estimated_minutes}
                                onChange={e => setData('estimated_minutes', parseInt(e.target.value) || 1)}
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
                </div>

                {/* Markdown editor */}
                <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">コンテンツ</h2>

                    {/* Language tabs */}
                    <div className="flex gap-2 mb-4">
                        <button
                            type="button"
                            onClick={() => setActiveTab('ja')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                activeTab === 'ja' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
                            }`}
                        >
                            日本語
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('en')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                activeTab === 'en' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
                            }`}
                        >
                            English
                        </button>
                    </div>

                    {/* Toolbar */}
                    <div className="flex flex-wrap gap-1 mb-2 p-2 rounded-t-lg bg-gray-800 border border-gray-700 border-b-0">
                        <button type="button" onClick={() => handleToolbar('**', '**')} className="px-2 py-1 text-xs rounded bg-gray-700 hover:bg-gray-600 text-gray-300 font-bold">B</button>
                        <button type="button" onClick={() => handleToolbar('*', '*')} className="px-2 py-1 text-xs rounded bg-gray-700 hover:bg-gray-600 text-gray-300 italic">I</button>
                        <span className="w-px bg-gray-600 mx-1" />
                        <button type="button" onClick={() => handleToolbar('# ')} className="px-2 py-1 text-xs rounded bg-gray-700 hover:bg-gray-600 text-gray-300">H1</button>
                        <button type="button" onClick={() => handleToolbar('## ')} className="px-2 py-1 text-xs rounded bg-gray-700 hover:bg-gray-600 text-gray-300">H2</button>
                        <button type="button" onClick={() => handleToolbar('### ')} className="px-2 py-1 text-xs rounded bg-gray-700 hover:bg-gray-600 text-gray-300">H3</button>
                        <span className="w-px bg-gray-600 mx-1" />
                        <button type="button" onClick={() => handleToolbar('```\n', '\n```')} className="px-2 py-1 text-xs rounded bg-gray-700 hover:bg-gray-600 text-gray-300">Code</button>
                        <button type="button" onClick={() => handleToolbar('> \u{1F4A1} ')} className="px-2 py-1 text-xs rounded bg-gray-700 hover:bg-gray-600 text-yellow-400">Tip</button>
                        <button type="button" onClick={() => handleToolbar('> \u{26A0}\u{FE0F} ')} className="px-2 py-1 text-xs rounded bg-gray-700 hover:bg-gray-600 text-red-400">Warn</button>
                        <span className="w-px bg-gray-600 mx-1" />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                            className="px-2 py-1 text-xs rounded bg-gray-700 hover:bg-gray-600 text-cyan-400 disabled:opacity-50"
                        >
                            {uploading ? '...' : 'Image'}
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={e => {
                                const file = e.target.files?.[0];
                                if (file) handleImageUpload(file);
                                e.target.value = '';
                            }}
                        />
                    </div>

                    {/* Editor + Preview split */}
                    <div className="grid grid-cols-2 gap-0">
                        {/* Editor */}
                        <div>
                            {activeTab === 'ja' ? (
                                <textarea
                                    ref={textareaJaRef}
                                    value={data.content_md}
                                    onChange={e => setData('content_md', e.target.value)}
                                    rows={30}
                                    className="w-full rounded-bl-lg rounded-none bg-gray-800 border border-gray-700 text-white px-4 py-3 text-sm font-mono focus:border-purple-500 focus:ring-purple-500 resize-y"
                                    placeholder="Markdown でレッスン内容を入力..."
                                />
                            ) : (
                                <textarea
                                    ref={textareaEnRef}
                                    value={data.content_md_en}
                                    onChange={e => setData('content_md_en', e.target.value)}
                                    rows={30}
                                    className="w-full rounded-bl-lg rounded-none bg-gray-800 border border-gray-700 text-white px-4 py-3 text-sm font-mono focus:border-purple-500 focus:ring-purple-500 resize-y"
                                    placeholder="Enter lesson content in Markdown..."
                                />
                            )}
                            {errors.content_md && <p className="text-red-400 text-xs mt-1">{errors.content_md}</p>}
                        </div>

                        {/* Preview */}
                        <div className="border border-gray-700 border-l-0 rounded-br-lg bg-gray-900 p-4 overflow-y-auto max-h-[720px]">
                            <div className="text-xs text-gray-500 mb-3 pb-2 border-b border-gray-800">Preview</div>
                            {currentContent ? (
                                <MarkdownRenderer content={currentContent} />
                            ) : (
                                <p className="text-gray-500 text-sm">プレビューがここに表示されます</p>
                            )}
                        </div>
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
                        href={route('admin.chapters.lessons.index', chapter.id)}
                        className="px-6 py-2 rounded-lg border border-gray-700 text-gray-300 hover:text-white text-sm transition-colors"
                    >
                        キャンセル
                    </Link>
                </div>
            </form>
        </AdminLayout>
    );
}
