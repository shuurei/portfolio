import { type ButtonHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export function Button({ className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            className={cn(
                'border-2 cursor-pointer',
                'hover:shadow-[3px_3px_0_rgba(0,0,0,1)]',
                'active:bg-black active:text-white active:shadow-none',
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}