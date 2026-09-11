import { motion, type HTMLMotionProps } from 'motion/react'
import { cn } from '@/utils/cn'

interface CardProps extends HTMLMotionProps<'section'> {
    delay?: number
}

export default function Card({ children, delay = 0, ...props }: CardProps) {
    return (
        <motion.section
            {...props}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay, ease: 'easeOut' }}
            className={cn('bg-white border border-zinc-200 shadow-sm shadow-zinc-200/80 flex flex-col md:p-8 p-4', props.className)}
        >
            {children}
        </motion.section>
    );
}