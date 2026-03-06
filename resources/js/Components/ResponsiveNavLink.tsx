import { InertiaLinkProps, Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}: InertiaLinkProps & { active?: boolean }) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${
                active
                    ? 'border-purple-400 bg-purple-900/30 text-purple-300 focus:border-purple-600 focus:bg-purple-900/50 focus:text-purple-200'
                    : 'border-transparent text-gray-400 hover:border-gray-600 hover:bg-gray-800 hover:text-gray-200 focus:border-gray-600 focus:bg-gray-800 focus:text-gray-200'
            } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
