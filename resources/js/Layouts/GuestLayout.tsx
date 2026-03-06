import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-950 pt-6 sm:justify-center sm:pt-0">
            <div className="absolute inset-0">
                <div className="absolute top-20 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
            </div>

            <div className="relative">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-4xl">🎮</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        Unity Quest
                    </span>
                </Link>
            </div>

            <div className="relative mt-6 w-full overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/80 px-6 py-6 shadow-xl backdrop-blur sm:max-w-md">
                {children}
            </div>
        </div>
    );
}
