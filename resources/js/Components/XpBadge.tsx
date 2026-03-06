interface XpBadgeProps {
    xp: number;
    size?: 'sm' | 'md';
}

export default function XpBadge({ xp, size = 'sm' }: XpBadgeProps) {
    const sizes = {
        sm: 'text-xs px-2 py-0.5',
        md: 'text-sm px-3 py-1',
    };

    return (
        <span className={`inline-flex items-center gap-1 rounded-full bg-yellow-500/20 text-yellow-400 font-medium ${sizes[size]}`}>
            <span>⚡</span>
            <span>+{xp} XP</span>
        </span>
    );
}
