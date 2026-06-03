import { motion } from 'motion/react'
import { FaCode, FaCubes, FaTools, FaDesktop, FaLayerGroup, FaHeart } from 'react-icons/fa'

import { skills, softSkills } from '@/data/skills'

import Card from '@/components/common/Card'
import { SEO } from '@/components/SEO'

const skillCategories = [
    {
        type: 'language',
        label: 'Langages',
        icon: FaCode,
        description: 'Les langages que je lis, écris et comprends',
        color: {
            icon: 'text-blue-500',
            border: 'border-blue-200',
            bg: 'bg-blue-50',
            badge: 'bg-blue-50 border-blue-200 text-blue-500',
            header: 'border-blue-100',
        },
    },
    {
        type: 'framework',
        label: 'Frameworks',
        icon: FaCubes,
        description: "Ce que j'utilise pour construire des applications",
        color: {
            icon: 'text-violet-500',
            border: 'border-violet-200',
            bg: 'bg-violet-50',
            badge: 'bg-violet-50 border-violet-200 text-violet-500',
            header: 'border-violet-100',
        },
    },
    {
        type: 'tool',
        label: 'Outils',
        icon: FaTools,
        description: 'Les outils qui font partie de mon workflow',
        color: {
            icon: 'text-amber-500',
            border: 'border-amber-200',
            bg: 'bg-amber-50',
            badge: 'bg-amber-50 border-amber-200 text-amber-500',
            header: 'border-amber-100',
        },
    },
    {
        type: 'os',
        label: 'Systèmes',
        icon: FaDesktop,
        description: 'Les environnements sur lesquels je travaille',
        color: {
            icon: 'text-emerald-500',
            border: 'border-emerald-200',
            bg: 'bg-emerald-50',
            badge: 'bg-emerald-50 border-emerald-200 text-emerald-500',
            header: 'border-emerald-100',
        },
    },
    {
        type: 'other',
        label: 'Autres',
        icon: FaLayerGroup,
        description: 'Runtime et DevOps.',
        color: {
            icon: 'text-rose-500',
            border: 'border-rose-200',
            bg: 'bg-rose-50',
            badge: 'bg-rose-50 border-rose-200 text-rose-500',
            header: 'border-rose-100',
        },
    },
] as const;

export default function SkillsPage() {
    return (
        <>
            <SEO
                title='Compétences'
                description='Mes compétences techniques et humaines en tant que développeur Full-Stack'
            />

            <main className='w-full max-w-7xl mx-auto md:px-6 px-4 py-6 md:py-10 flex flex-col md:gap-8 gap-6'>
                {/* Soft Skills */}
                <Card>
                    <div className='flex items-center gap-4 border-b-2 pb-3 border-zinc-200'>
                        <FaHeart className='text-pink-500 text-3xl' />
                        <div className='flex flex-col'>
                            <span className='font-bold text-zinc-800 text-lg'>Savoir-être</span>
                            <span className='text-sm text-zinc-400'>Ce qui me définit au-delà du code :)</span>
                        </div>
                    </div>
                    <div className='pt-6 flex flex-wrap gap-2'>
                        {softSkills.map((skill, i) => (
                            <motion.span
                                key={skill}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: i * 0.1, ease: 'easeOut' }}
                                className='px-2.5 py-1 text-sm text-zinc-500 border border-zinc-200'
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </div>
                </Card>

                {/* Categories  */}
                {skillCategories.map(({ icon: CategoryIcon, ...category }, ci) => {
                    const categorySkills = skills.filter(({ type }) => category.type === type);
                    if (categorySkills.length === 0) return null

                    return (
                        <Card key={category.type} delay={ci * 0.08}>
                            {/* Header */}
                            <div className={`flex items-center gap-4 border-b-2 pb-3 border-zinc-200`}>
                                <CategoryIcon className={`text-3xl ${category.color.icon}`} />
                                <div className='flex flex-col'>
                                    <span className='font-bold text-zinc-800 text-lg'>
                                        {category.label}
                                    </span>
                                    <span className='text-sm text-zinc-400'>
                                        {category.description}
                                    </span>
                                </div>
                            </div>

                            {/* Items */}
                            <div className='px-2 pt-4 flex flex-col divide-y divide-zinc-200'>
                                {categorySkills.sort((a, b) => (b.years ?? 0) - (a.years ?? 0)).map(({ icon: Icon, ...skill }, i) => {
                                    return (
                                        <motion.div
                                            key={skill.name}
                                            initial={{ opacity: 0, x: -8 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.3, delay: ci * 0.1 + i * 0.05, ease: 'easeOut' }}
                                            className='flex items-center justify-between py-3'
                                        >
                                            <div className='flex items-center gap-3'>
                                                <Icon className={`text-xl ${category.color.icon}`} />
                                                <span className='text-sm font-medium text-zinc-700'>
                                                    {skill.name}
                                                </span>
                                            </div>
                                            {skill.years ? (
                                                <span className={`text-xs px-2 py-0.5 border ${category.color.badge}`}>
                                                    {skill.years} an{skill.years > 1 ? 's' : ''}
                                                </span>
                                            ) : (
                                                <span className='text-xs text-zinc-300 italic'>—</span>
                                            )}
                                        </motion.div>
                                    )
                                })}
                            </div>
                        </Card>
                    );
                })}
            </main>
        </>
    )
}