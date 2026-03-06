import { InputHTMLAttributes } from 'react';

export default function Checkbox({
    className = '',
    ...props
}: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-gray-600 bg-gray-800 text-purple-500 shadow-sm focus:ring-purple-500 focus:ring-offset-gray-900 ' +
                className
            }
        />
    );
}
