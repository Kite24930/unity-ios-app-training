const translations: Record<string, Record<string, string>> = {
    ja: {
        // Navigation
        'nav.dashboard': 'ダッシュボード',
        'nav.courses': 'コース一覧',
        'nav.profile': 'プロフィール',
        'nav.logout': 'ログアウト',
        'nav.login': 'ログイン',
        'nav.register': '新規登録',

        // Welcome page
        'welcome.title': 'Unity iOS ゲーム開発',
        'welcome.subtitle': 'Web開発者のための実践学習プラットフォーム',
        'welcome.description': 'LaravelやReactの経験を活かして、Unityを使ったiOSゲーム開発をマスターしましょう。基礎から App Store 公開まで、ステップバイステップで学べます。',
        'welcome.start': '学習を始める',
        'welcome.view_courses': 'コースを見る',
        'welcome.feature1.title': 'Web開発者に最適化',
        'welcome.feature1.desc': 'Laravel/React の知識を活かしたカリキュラム構成。馴染みのある概念との比較で理解が深まります。',
        'welcome.feature2.title': 'ゲーミフィケーション',
        'welcome.feature2.desc': 'XP獲得、レベルアップ、バッジ収集で楽しく学習。モチベーションを維持できます。',
        'welcome.feature3.title': '実践的なプロジェクト',
        'welcome.feature3.desc': '2Dゲームから3Dゲームまで、実際にApp Storeに公開できるクオリティのプロジェクトを制作。',

        // Dashboard
        'dashboard.title': 'ダッシュボード',
        'dashboard.level': 'レベル',
        'dashboard.total_xp': '総XP',
        'dashboard.streak': '連続学習',
        'dashboard.streak_days': '日',
        'dashboard.progress': '全体の進捗',
        'dashboard.recent': '最近の学習',
        'dashboard.badges': '獲得バッジ',
        'dashboard.no_badges': 'まだバッジを獲得していません',
        'dashboard.course_progress': 'コース別進捗',
        'dashboard.start_learning': '学習を始めましょう！',

        // Courses
        'courses.title': 'コース一覧',
        'courses.beginner': '初級',
        'courses.intermediate': '中級',
        'courses.advanced': '上級',
        'courses.hours': '時間',
        'courses.lessons': 'レッスン',
        'courses.progress': '進捗',
        'courses.start': '学習を始める',
        'courses.continue': '続きから学習',
        'courses.completed': '完了！',

        // Lessons
        'lesson.complete': 'レッスン完了！',
        'lesson.already_completed': '完了済み',
        'lesson.xp': 'XP獲得',
        'lesson.minutes': '分',
        'lesson.prev': '前のレッスン',
        'lesson.next': '次のレッスン',
        'lesson.back_to_course': 'コースに戻る',

        // Common
        'common.loading': '読み込み中...',
    },
    en: {
        'nav.dashboard': 'Dashboard',
        'nav.courses': 'Courses',
        'nav.profile': 'Profile',
        'nav.logout': 'Logout',
        'nav.login': 'Login',
        'nav.register': 'Register',

        'welcome.title': 'Unity iOS Game Dev',
        'welcome.subtitle': 'A Practical Learning Platform for Web Developers',
        'welcome.description': 'Leverage your Laravel and React experience to master iOS game development with Unity. Learn step by step from basics to App Store publishing.',
        'welcome.start': 'Start Learning',
        'welcome.view_courses': 'View Courses',
        'welcome.feature1.title': 'Optimized for Web Devs',
        'welcome.feature1.desc': 'Curriculum built around Laravel/React knowledge. Understand new concepts through familiar comparisons.',
        'welcome.feature2.title': 'Gamification',
        'welcome.feature2.desc': 'Earn XP, level up, and collect badges as you learn. Stay motivated throughout your journey.',
        'welcome.feature3.title': 'Hands-on Projects',
        'welcome.feature3.desc': 'Build App Store-quality projects from 2D to 3D games.',

        'dashboard.title': 'Dashboard',
        'dashboard.level': 'Level',
        'dashboard.total_xp': 'Total XP',
        'dashboard.streak': 'Streak',
        'dashboard.streak_days': 'days',
        'dashboard.progress': 'Overall Progress',
        'dashboard.recent': 'Recent Activity',
        'dashboard.badges': 'Badges Earned',
        'dashboard.no_badges': 'No badges earned yet',
        'dashboard.course_progress': 'Course Progress',
        'dashboard.start_learning': 'Start learning!',

        'courses.title': 'Courses',
        'courses.beginner': 'Beginner',
        'courses.intermediate': 'Intermediate',
        'courses.advanced': 'Advanced',
        'courses.hours': 'hours',
        'courses.lessons': 'lessons',
        'courses.progress': 'Progress',
        'courses.start': 'Start Learning',
        'courses.continue': 'Continue',
        'courses.completed': 'Completed!',

        'lesson.complete': 'Complete Lesson!',
        'lesson.already_completed': 'Completed',
        'lesson.xp': 'XP earned',
        'lesson.minutes': 'min',
        'lesson.prev': 'Previous',
        'lesson.next': 'Next',
        'lesson.back_to_course': 'Back to Course',

        'common.loading': 'Loading...',
    },
};

export function t(key: string, locale: string = 'ja'): string {
    return translations[locale]?.[key] ?? translations['ja']?.[key] ?? key;
}

export function useTranslation(locale: string = 'ja') {
    return {
        t: (key: string) => t(key, locale),
        locale,
    };
}
