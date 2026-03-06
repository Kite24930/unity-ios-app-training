import { useTranslation } from '@/i18n';

interface DifficultyBadgeProps {
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    locale?: string;
}

export default function DifficultyBadge({ difficulty, locale = 'ja' }: DifficultyBadgeProps) {
    const { t } = useTranslation(locale);

    const styles = {
        beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
        intermediate: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        advanced: 'bg-red-500/20 text-red-400 border-red-500/30',
    };

    const labels = {
        beginner: t('courses.beginner'),
        intermediate: t('courses.intermediate'),
        advanced: t('courses.advanced'),
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[difficulty]}`}>
            {labels[difficulty]}
        </span>
    );
}
