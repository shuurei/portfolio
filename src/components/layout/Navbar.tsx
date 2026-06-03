import { useEffect, useState, useRef } from 'react'
import { Link, useLocation } from 'react-router'
import { motion, AnimatePresence } from 'motion/react'

import { cn } from '@/utils/cn'
import ButtonDownloadCV from '../ButtonDownloadCV'

const links = [
    { to: '/', label: 'Accueil' },
    { to: '/projects', label: 'Projets' },
    { to: '/skills', label: 'Compétences' },
    { to: '/journey', label: 'Parcours' }
] as const

export default function Navbar() {
    const { pathname } = useLocation()
    const [isOpen, setIsOpen] = useState(false)
    const [barStyle, setBarStyle] = useState<{ left: number; width: number } | null>(null)
    const navRef = useRef<HTMLElement>(null)
    const itemRefs = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('overflow-hidden')
        } else {
            document.body.classList.remove('overflow-hidden')
        }
    }, [isOpen])

    const updateBar = (index: number | null) => {
        if (index === null || !navRef.current) {
            setBarStyle(null)
            return
        }
        const item = itemRefs.current[index]
        if (!item) return
        const navRect = navRef.current.getBoundingClientRect()
        const itemRect = item.getBoundingClientRect()
        setBarStyle({
            left: itemRect.left - navRect.left,
            width: itemRect.width,
        })
    }

    return (
        <>
            {/* Desktop */}
            <nav ref={navRef} className='hidden md:flex gap-1 lg:text-xl relative'>
                {/* Barre qui slide */}
                <AnimatePresence>
                    {barStyle && (
                        <motion.div
                            className='absolute bottom-0 h-0.5 bg-zinc-800 pointer-events-none'
                            initial={false}
                            animate={{ left: barStyle.left, width: barStyle.width, opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                        />
                    )}
                </AnimatePresence>

                {links.map(({ to, label }, i) => {
                    const isActive = pathname === to
                    return (
                        <motion.div
                            key={to}
                            ref={el => { itemRefs.current[i] = el }}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.08 + i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                            onMouseEnter={() => updateBar(i)}
                            onMouseLeave={() => updateBar(null)}
                        >
                            <Link
                                to={to}
                                className={cn(
                                    'uppercase px-3 py-1.5 tracking-widest transition-colors duration-200 block',
                                    isActive
                                        ? 'text-zinc-900 font-semibold'
                                        : 'text-zinc-400 hover:text-zinc-700'
                                )}
                            >
                                {label}
                            </Link>
                        </motion.div>
                    )
                })}
            </nav>

            {/* Burger */}
            <motion.button
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className='md:hidden flex flex-col gap-1.5 p-2 z-50'
                onClick={() => setIsOpen(prev => !prev)}
                aria-label='Menu'
            >
                <motion.span
                    animate={isOpen ? { y: 8, rotate: 45 } : { y: 0, rotate: 0 }}
                    transition={{ duration: 0.22 }}
                    className='block w-8 h-0.5 bg-zinc-800'
                />
                <motion.span
                    animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.22 }}
                    className='block w-8 h-0.5 bg-zinc-800'
                />
                <motion.span
                    animate={isOpen ? { y: -8, rotate: -45 } : { y: 0, rotate: 0 }}
                    transition={{ duration: 0.22 }}
                    className='block w-8 h-0.5 bg-zinc-800'
                />
            </motion.button>

            {/* Mobile */}
            <AnimatePresence>
                {isOpen && (
                    <motion.nav
                        className='fixed top-24 right-0 w-full z-50 md:hidden flex flex-col justify-between border-zinc-500 bg-zinc-50'
                        style={{ height: 'calc(100% - 96px)' }}
                        initial={{ x: '100%', borderLeftWidth: 4 }}
                        animate={{ x: 0, borderLeftWidth: 0 }}
                        exit={{ x: '100%', borderLeftWidth: 4 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                        <div>
                            {links.map(({ to, label }, i) => (
                                <motion.div
                                    key={to}
                                    initial={{ opacity: 0, x: 16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 16 }}
                                    transition={{ delay: 0.04 + i * 0.04, duration: 0.2, ease: 'easeOut' }}
                                >
                                    <Link
                                        to={to}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            'flex w-full px-8 py-6 sm:text-xl items-center gap-1 uppercase tracking-widest border-b border-zinc-200 transition-colors duration-200',
                                            pathname === to
                                                ? 'text-zinc-900 bg-zinc-200/50 font-semibold'
                                                : 'text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100'
                                        )}
                                    >
                                        {pathname === to ? <span className='text-2xl'>{'> '}</span> : ''}
                                        <span>{label}</span>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                        <div className='p-6 border-t-2 border-zinc-500'>
                            <div className='flex gap-2 *:border-2 *:cursor-pointer *:active:bg-black *:active:text-white'>
                                <ButtonDownloadCV className='p-2.5 font-semibold'>
                                    CV
                                </ButtonDownloadCV>
                            </div>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </>
    )
}