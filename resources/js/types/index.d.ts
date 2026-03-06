export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    total_xp: number;
    current_streak: number;
    locale: 'ja' | 'en';
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};

export interface CourseCard {
    id: number;
    slug: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    estimated_hours: number;
    total_lessons: number;
    completed_lessons: number;
    progress: number;
}

export interface ChapterWithLessons {
    id: number;
    slug: string;
    title: string;
    lessons: LessonSummary[];
}

export interface LessonSummary {
    id: number;
    slug: string;
    title: string;
    estimated_minutes: number;
    xp_reward: number;
    is_completed: boolean;
}

export interface LessonDetail {
    id: number;
    slug: string;
    title: string;
    content: string;
    xp_reward: number;
    estimated_minutes: number;
    is_completed: boolean;
}

export interface LessonNav {
    id: number;
    slug: string;
    chapter_slug: string;
    course_slug: string;
    title: string;
}

export interface SidebarChapter {
    title: string;
    slug: string;
    lessons: {
        id: number;
        slug: string;
        title: string;
        is_completed: boolean;
    }[];
}

export interface BadgeInfo {
    name: string;
    icon: string;
    color: string;
    earned_at: string;
}

export interface DashboardStats {
    total_xp: number;
    level: number;
    xp_for_current_level: number;
    current_streak: number;
    total_completed: number;
    total_lessons: number;
    overall_progress: number;
}

export interface CourseProgress {
    slug: string;
    title: string;
    icon: string;
    color: string;
    total_lessons: number;
    completed_lessons: number;
    progress: number;
}

export interface RecentCompletion {
    lesson_title: string;
    course_title: string;
    xp_earned: number;
    completed_at: string;
}
