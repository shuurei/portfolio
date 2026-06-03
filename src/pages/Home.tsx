import { motion } from 'motion/react'
import type { Transition } from 'motion/react'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { SEO } from '@/components/SEO'
import { Button } from '@/components/common/Button'
import Card from '@/components/common/Card'
import { Link } from 'react-router'
import { useMemo } from 'react'
import { skills, softSkills } from '@/data/skills'
import { useProjects } from '@/contexts/ProjectsContext'
import ShortProjectCard from '@/components/ShortProjectCard'
import ButtonDownloadCV from '@/components/ButtonDownloadCV'
import { me } from '@/data/me'

function fadeUp(delay = 0) {
    const transition: Transition = { duration: 0.5, delay, ease: 'easeOut' }
    const initial = { opacity: 0, y: 24 }
    const animate = { opacity: 1, y: 0 }
    return { initial, animate, transition }
}

export default function HomePage() {
    const { projects } = useProjects();

    const stackByYears = useMemo(() => {
        const groups: Record<number, typeof skills> = {}

        skills.filter(({ years }) => years !== undefined).forEach(({ years, ...skill }) => {
            years = Math.min(years!, 4);

            if (!groups[years]) {
                groups[years] = []
            }

            groups[years].push(skill);
        });

        return Object.entries(groups)
            .sort(([a], [b]) => +b - +a)
            .map(([year, items]) => ({
                year,
                label: +year >= 4 ? '4 ans +' : `${year} ans`,
                items,
            }));
    }, []);

    return (
        <>
            <SEO description='Home page !' />

            <main className='w-full max-w-7xl mx-auto md:px-6 px-4 py-6 md:py-10 flex flex-col md:gap-8 gap-6'>
                {/* Hero Card */}
                <Card delay={0} className='gap-3 md:gap-6'>
                    <motion.h1
                        initial={fadeUp(0.1).initial}
                        animate={fadeUp(0.1).animate}
                        transition={fadeUp(0.1).transition}
                        className='sm:text-3xl text-2xl md:text-4xl font-bold text-zinc-800'
                    >
                        Mastère Développeur Full-Stack
                    </motion.h1>

                    {/* Avatar */}
                    <div className='flex flex-col md:flex-row gap-8'>
                        <motion.div
                            initial={fadeUp(0.2).initial}
                            animate={fadeUp(0.2).animate}
                            transition={fadeUp(0.2).transition}
                            className='self-center pl-2'
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0, 1, 0, 1] }}
                                transition={{
                                    duration: 0.4,
                                    delay: 0.4,
                                    times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                                    ease: 'easeIn',
                                }}
                            >
                                <div className='relative'>
                                    <div className='absolute z-20 border-t-3 border-l-3 border-zinc-900' style={{ width: 40, height: 40, top: -8, left: -8 }} />
                                    <div className='absolute z-20 border-t-3 border-r-3 border-zinc-900' style={{ width: 40, height: 40, top: -8, right: -8 }} />
                                    <div className='absolute z-20 border-b-3 border-l-3 border-zinc-900' style={{ width: 40, height: 40, bottom: -8, left: -8 }} />
                                    <div className='absolute z-20 border-b-3 border-r-3 border-zinc-900' style={{ width: 40, height: 40, bottom: -8, right: -8 }} />

                                    <img
                                        src='/portfolio/avatar.jpg'
                                        alt='Photo de Lenny'
                                        className='object-cover object-top border-2 border-zinc-900'
                                    />
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Contenu */}
                        <div className='flex-1 flex flex-col justify-between gap-5'>
                            <div className='flex flex-col gap-4'>
                                <motion.div
                                    initial={fadeUp(0.3).initial}
                                    animate={fadeUp(0.3).animate}
                                    transition={fadeUp(0.3).transition}
                                    className='flex items-center gap-2'
                                >
                                    <span className='relative flex h-2.5 w-2.5 shrink-0'>
                                        <span className='animate-ping absolute inline-flex h-full w-full bg-emerald-400 opacity-75' />
                                        <span className='relative inline-flex h-2.5 w-2.5 bg-emerald-500' />
                                    </span>
                                    <span className='text-xs font-semibold tracking-widest text-emerald-500 uppercase'>
                                        En recherche d'alternance
                                    </span>
                                </motion.div>

                                <div className='flex flex-col gap-2'>
                                    <motion.p
                                        initial={fadeUp(0.35).initial}
                                        animate={fadeUp(0.35).animate}
                                        transition={fadeUp(0.35).transition}
                                        className='sm:text-4xl text-3xl md:text-5xl font-bold text-zinc-800'
                                    >Lenny</motion.p>

                                    {/* Bio */}
                                    <motion.p
                                        initial={fadeUp(0.4).initial}
                                        animate={fadeUp(0.4).animate}
                                        transition={fadeUp(0.4).transition}
                                        className='text-zinc-500 text-base leading-relaxed max-w-lg'
                                    >
                                        J'aime dev des projets perso et je suis aujourd'hui étudiant
                                        développeur fullstack. Ce qui me motive ?
                                        Apprendre une nouvelle techno, comprendre comment elle fonctionne,
                                        et l'utiliser pour construire quelque chose de concret :)
                                    </motion.p>
                                </div>
                            </div>

                            {/* Actions */}
                            <motion.div
                                initial={fadeUp(0.5).initial}
                                animate={fadeUp(0.5).animate}
                                transition={fadeUp(0.5).transition}
                                className='flex items-center justify-between flex-wrap gap-4'
                            >
                                <div className='flex gap-3'>
                                    <ButtonDownloadCV className='px-2.5 py-1.75 sm:px-5 sm:py-2.5 font-semibold'>
                                        Voir mon CV
                                    </ButtonDownloadCV>
                                    <a href={`mailto:${me.email}`} target='_blank'>
                                        <Button className='px-2.5 py-1.75 sm:px-5 sm:py-2.5 font-semibold'>
                                            Me contacter
                                        </Button>
                                    </a>
                                </div>
                                <div className='flex gap-4'>
                                    {[
                                        { icon: <FaGithub />, href: '#' },
                                        { icon: <FaLinkedin />, href: '#' },
                                        { icon: <FaEnvelope />, href: '#' },
                                    ].map(({ icon, href }, i) => (
                                        <a key={i} href={href} className='text-zinc-400 hover:text-zinc-700 transition-colors text-xl'>
                                            {icon}
                                        </a>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </Card>

                {/* Skills Card */}
                <Card delay={0.1} className='gap-3 md:gap-6'>
                    <div>
                        <h2 className='text-2xl font-bold text-zinc-800'>Compétences</h2>
                        <p className='text-sm text-zinc-400 mt-1'>Triées par années d'expérience</p>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
                        {stackByYears.map(({ year, label, items }) => (
                            <div key={year} className='flex flex-col gap-2'>
                                <span className='text-xs font-medium text-zinc-400 uppercase tracking-wider pb-2 border-b border-zinc-100'>
                                    {label}
                                </span>
                                {items.map(({ icon: Icon, ...item }) => {
                                    return (
                                        <div
                                            key={item.name}
                                            className='flex items-center gap-1.5 text-sm text-zinc-600'
                                        >
                                            <Icon className='text-zinc-400 shrink-0' />
                                            {item.name}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>

                    <div className='flex flex-col gap-2'>
                        <p className='text-xs font-medium text-zinc-400 uppercase tracking-wider'>Savoir-être</p>
                        <div className='flex flex-wrap gap-2'>
                            {softSkills.map((skill) => (
                                <span key={skill} className='px-2.5 py-1 text-sm text-zinc-500 border border-zinc-200'>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <Link
                        to='/skills'
                        className='flex items-center justify-between pt-4 border-t border-zinc-100 text-sm text-zinc-400 hover:text-zinc-700 transition-colors group'
                    >
                        <span>Voir toutes mes compétences</span>
                        <span className='transition-transform group-hover:translate-x-1'>→</span>
                    </Link>
                </Card>

                {/* Projects Card */}
                <Card delay={0.2} className='gap-3 md:gap-6'>
                    <h2 className='text-2xl font-bold text-zinc-800'>Derniers projets</h2>
                    <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {projects.slice(0, 3).map((project, i) => (
                            <li key={project.name} className='mb-4 break-inside-avoid'>
                                <ShortProjectCard delay={i * 0.1} project={project} />
                            </li>
                        ))}
                    </ul>
                    <Link
                        to='/projects'
                        className='flex items-center justify-between pt-4 border-t border-zinc-100 text-sm text-zinc-400 hover:text-zinc-700 transition-colors group'
                    >
                        <span>Voir tout mes projets</span>
                        <span className='transition-transform group-hover:translate-x-1'>→</span>
                    </Link>
                </Card>
            </main>
        </>
    )
}