interface ProgressBarProps {
    progress: number;
    color?: string;
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
    animated?: boolean;
}

export default function ProgressBar({
    progress,
    color = '#8b5cf6',
    size = 'md',
    showLabel = true,
    animated = true,
}: ProgressBarProps) {
    const heights = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' };

    return (
        <div className="w-full">
            <div className={`w-full rounded-full bg-gray-700/50 ${heights[size]} overflow-hidden`}>
                <div
                    className={`${heights[size]} rounded-full transition-all duration-700 ease-out ${animated ? 'animate-pulse-subtle' : ''}`}
                    style={{
                        width: `${Math.min(progress, 100)}%`,
                        backgroundColor: color,
                        boxShadow: `0 0 10px ${color}40`,
                    }}
                />
            </div>
            {showLabel && (
                <span className="text-xs text-gray-400 mt-1 block text-right">
                    {progress}%
                </span>
            )}
        </div>
    );
}
