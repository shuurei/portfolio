import { motion } from 'motion/react'

import Navbar from './Navbar'
import ButtonDownloadCV from '../ButtonDownloadCV'

function Logo() {
    return (
        <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5, ease: 'easeOut' }}
            className='select-none tracking-wide font-bold sm:text-4xl text-3xl text-zinc-800 flex items-center gap-0.5'
        >
            <span>{'<'}</span>
            <span>LL </span>
            <span className='inline-block animate-caret'>/</span>
            <span>{'>'}</span>
        </motion.h2>
    )
}

export default function Header() {
    return (
        <header className='sticky top-0 z-50 flex items-center justify-center bg-zinc-50 h-25 px-8 py-6 border-b-2 border-zinc-500'>
            <div className='max-w-7xl h-full w-full flex items-center justify-between'>
                <Logo />
                <div className='md:absolute top-1/2 left-1/2 md:-translate-1/2'>
                    <Navbar />
                </div>
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5, ease: 'easeOut' }}
                    className='border-zinc-500 max-md:hidden'
                >
                    <div className='flex gap-2'>
                        <ButtonDownloadCV className='p-2.5 font-semibold'>
                            CV
                        </ButtonDownloadCV>
                        {/* <Button className='p-2.5'>
                            <FaMoon />
                        </Button> */}
                    </div>
                </motion.div>
            </div>
        </header>
    )
}