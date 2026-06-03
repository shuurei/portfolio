import { motion } from 'motion/react'
import type { ReactNode } from 'react'

function formatDate(dateStr: string) {
    const [month, , year] = dateStr.split('/');
    return new Intl.DateTimeFormat('fr-FR', { month: 'short', year: 'numeric' }).format(new Date(Number(year), Number(month) - 1));
}

export interface BaseTimelineItemProps {
    icon: ReactNode
    accentDot: string
    accentBadge: string
    tag: string
    title: string
    subtitle?: string
    description: string
    startAt: string
    endAt: string
    isLast: boolean
    delay?: number
}

export default function BaseTimelineItem({
    icon,
    accentDot,
    accentBadge,
    tag,
    title,
    subtitle,
    description,
    startAt,
    endAt,
    isLast,
    delay = 0,
}: BaseTimelineItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay, ease: 'easeOut' }}
        >
            {/* Mobile */}
            <div className={`md:hidden bg-white border shadow-sm shadow-zinc-200/80 flex overflow-hidden mb-4 border-l-6 ${accentBadge}`}>
                <div className='flex-1 flex flex-col gap-2 px-4 py-4'>
                    <div className='flex items-center justify-between gap-2 flex-wrap'>
                        <div className='flex items-center gap-2 flex-wrap'>
                            <span className={`text-xs font-semibold px-2 py-0.5 border ${accentBadge}`}>
                                {tag}
                            </span>
                            {subtitle && (
                                <span className='text-xs text-zinc-400'>{subtitle}</span>
                            )}
                        </div>
                        <div className='flex items-center gap-1'>
                            <span className='text-xs font-medium text-zinc-500 bg-zinc-50 border border-zinc-200 px-2 py-0.5'>
                                {formatDate(startAt)}
                            </span>
                            <span className='text-xs text-zinc-300'>→</span>
                            <span className='text-xs font-medium text-zinc-500 bg-zinc-50 border border-zinc-200 px-2 py-0.5'>
                                {formatDate(endAt)}
                            </span>
                        </div>
                    </div>
                    <h3 className='font-bold text-zinc-800 text-base leading-snug'>{title}</h3>
                    <p className='text-xs text-zinc-500 leading-relaxed'>{description}</p>
                </div>
            </div>

            {/* Desktop : timeline avec point + ligne */}
            <div className='hidden md:flex gap-6'>
                <div className='flex flex-col items-center'>
                    <div className='relative flex items-center justify-center w-9 h-9 shrink-0'>
                        <div className={`relative w-9 h-9 flex items-center justify-center ${accentDot} text-white text-sm z-10`}>
                            {icon}
                        </div>
                    </div>
                    {!isLast && <div className='w-px flex-1 bg-zinc-200 my-2' />}
                </div>

                <div className={`flex-1 bg-white border border-zinc-200 shadow-sm shadow-zinc-200/80 flex flex-col gap-2 px-6 py-5 mb-6`}>
                    <div className='flex items-start justify-between gap-2'>
                        <div className='flex items-center gap-2 flex-wrap'>
                            <span className={`text-xs font-semibold px-2 py-0.5 border ${accentBadge}`}>
                                {tag}
                            </span>
                            <h3 className='font-bold text-zinc-800 text-lg leading-snug'>{title}</h3>
                        </div>
                        <div className='flex items-center gap-1.5 shrink-0'>
                            <span className='text-xs font-medium text-zinc-500 bg-zinc-50 border border-zinc-200 px-2 py-0.5'>
                                {formatDate(startAt)}
                            </span>
                            <span className='text-xs text-zinc-300'>→</span>
                            <span className='text-xs font-medium text-zinc-500 bg-zinc-50 border border-zinc-200 px-2 py-0.5'>
                                {formatDate(endAt)}
                            </span>
                        </div>
                    </div>
                    {subtitle && (
                        <span className='text-sm text-zinc-600 font-medium'>{subtitle}</span>
                    )}
                    <p className='text-sm text-zinc-500 leading-relaxed'>{description}</p>
                </div>
            </div>
        </motion.div>
    )
}