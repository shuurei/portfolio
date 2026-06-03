import { useEffect, useState } from 'react'
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

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [isOpen]);

    return (
        <>
            {/* Desktop */}
            <nav className='hidden md:flex gap-2 lg:text-xl'>
                {links.map(({ to, label }, i) => (
                    <motion.div
                        key={to}
                        initial={{ opacity: 0, y: -15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 + i * 0.2, ease: 'easeOut' }}
                    >
                        <Link
                            to={to}
                            className={cn(
                                'border-b-2 uppercase px-2 py-1 tracking-widest transition-all duration-200 text-zinc-500',
                                pathname === to
                                    ? 'text-zinc-800 font-semibold'
                                    : 'border-transparent hover:border-zinc-600 hover:tracking-[5px] hover:text-zinc-600'
                            )}
                        >{label}</Link>
                    </motion.div>
                ))}
            </nav>

            {/* Burger */}
            <motion.button
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5, ease: 'easeOut' }}
                className='md:hidden flex flex-col gap-2 p-2 z-50'
                onClick={() => setIsOpen(prev => !prev)}
                aria-label='Menu'

            >
                <motion.span
                    animate={isOpen ? { y: 10, rotate: 45 } : { y: 0, rotate: 0 }}
                    transition={{ duration: 0.25 }}
                    className='block w-8 h-0.5 bg-zinc-800'
                />
                <motion.span
                    animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.25 }}
                    className='block w-8 h-0.5 bg-zinc-800'
                />
                <motion.span
                    animate={isOpen ? { y: -10, rotate: -45 } : { y: 0, rotate: 0 }}
                    transition={{ duration: 0.25 }}
                    className='block w-8 h-0.5 bg-zinc-800'
                />
            </motion.button>

            {/* Mobile */}
            <AnimatePresence>
                {isOpen && (
                    <motion.nav
                        className='fixed top-25 right-0 w-full z-50 md:hidden flex flex-col justify-between border-zinc-500 bg-zinc-50'
                        style={{ height: 'calc(100% - 100px)' }}
                        initial={{ x: '100%', borderLeftWidth: 4 }}
                        animate={{ x: 0, borderLeftWidth: 0 }}
                        exit={{ x: '100%', borderLeftWidth: 4 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <div>
                            {links.map(({ to, label }, i) => (
                                <motion.div
                                    key={to}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ delay: 0.2 + i * 0.07, ease: 'easeInOut' }}
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
                                {/* <button className='p-2.5'>
                                    <FaMoon />
                                </button> */}
                            </div>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </>
    )
}