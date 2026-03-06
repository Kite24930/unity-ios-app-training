export default function MarkdownRenderer({ content }: { content: string }) {
    const html = content
        // Code blocks with language
        .replace(/```(\w+)?\n([\s\S]*?)```/g, (_match, lang, code) => {
            return `<pre class="bg-gray-800 rounded-xl p-4 overflow-x-auto my-4 border border-gray-700"><code class="text-sm text-gray-300 language-${lang || ''}">${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
        })
        // Inline code
        .replace(/`([^`]+)`/g, '<code class="bg-gray-800 text-purple-300 px-1.5 py-0.5 rounded text-sm">$1</code>')
        // Headers
        .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-white mt-8 mb-4">$1</h3>')
        .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-white mt-10 mb-4">$1</h2>')
        .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-white mt-10 mb-6">$1</h1>')
        // Bold and italic
        .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        // Blockquotes (tip boxes)
        .replace(/^> 💡 (.+)$/gm, '<div class="bg-yellow-500/10 border-l-4 border-yellow-500 p-4 my-4 rounded-r-lg"><span class="text-yellow-400">💡 </span><span class="text-yellow-200">$1</span></div>')
        .replace(/^> ⚠️ (.+)$/gm, '<div class="bg-red-500/10 border-l-4 border-red-500 p-4 my-4 rounded-r-lg"><span class="text-red-400">⚠️ </span><span class="text-red-200">$1</span></div>')
        .replace(/^> 🔄 (.+)$/gm, '<div class="bg-blue-500/10 border-l-4 border-blue-500 p-4 my-4 rounded-r-lg"><span class="text-blue-400">🔄 </span><span class="text-blue-200">$1</span></div>')
        .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-gray-600 pl-4 my-4 text-gray-400 italic">$1</blockquote>')
        // Images
        .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="rounded-xl my-4 max-w-full border border-gray-700" loading="lazy" />')
        // Lists
        .replace(/^- (.+)$/gm, '<li class="text-gray-300 ml-6 list-disc mb-1">$1</li>')
        .replace(/^(\d+)\. (.+)$/gm, '<li class="text-gray-300 ml-6 list-decimal mb-1">$2</li>')
        // Horizontal rules
        .replace(/^---$/gm, '<hr class="border-gray-700 my-8" />')
        // Paragraphs
        .replace(/^(?!<[hupldbo]|<li|<hr|<pre|<code|<img)(.+)$/gm, '<p class="text-gray-300 leading-relaxed mb-4">$1</p>')
        // Clean up empty paragraphs
        .replace(/<p class="text-gray-300 leading-relaxed mb-4"><\/p>/g, '');

    return (
        <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}
