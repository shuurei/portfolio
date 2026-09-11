import { motion } from 'motion/react'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { FiCalendar, FiRefreshCw } from 'react-icons/fi'

import { type Project } from '@/contexts/ProjectsContext'
import { formatProjectName } from '@/utils/string'
import { getLanguageColors } from '@/utils/color'

export default function ProjectCard({ project }: { project: Project }) {
    const lang = getLanguageColors(project.language);
    const accentText = lang?.badge.split(' ').find(c => c.startsWith('text-')) ?? 'text-zinc-500'
    const accentBorder = lang?.badge.split(' ').find(c => c.startsWith('border-')) ?? 'border-zinc-200'
    const accentBg = lang?.badge.split(' ').find(c => c.startsWith('bg-')) ?? 'bg-zinc-50'

    const createdAt = project.createdAt
        ? new Date(project.createdAt).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })
        : null

    const updatedAt = project.updatedAt
        ? new Date(project.updatedAt).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })
        : null

    return (
        <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className='relative flex flex-col h-full bg-white border border-zinc-200 hover:border-zinc-300 group overflow-hidden'
        >
            {/* Header */}
            <div className='sm:px-5 px-2.5 sm:pt-5 pt-2.5 sm:pb-4 pb-2 flex items-start justify-between gap-3'>
                <div className='flex flex-col gap-1 w-full'>
                    <div className='flex gap-2 items-center justify-between'>
                        <h3 className='text-lg font-semibold text-zinc-800 leading-tight tracking-wide'>
                            {formatProjectName(project.name)}
                        </h3>

                        {lang && (
                            <span className={`w-fit text-sm px-2 py-0.5 border ${lang.badge}`}>
                                {project.language}
                            </span>
                        )}
                    </div>
                    <div className={`flex items-center gap-2 flex-wrap border-l-2 pl-2 ${accentBorder}`}>
                        {(createdAt || updatedAt) && (
                            <span className='text-sm text-zinc-500 flex flex-col gap-1'>
                                {createdAt && (
                                    <span className='flex items-center gap-1'>
                                        <FiCalendar />
                                        Créé le {createdAt}
                                    </span>
                                )}
                                {updatedAt && updatedAt !== createdAt && (
                                    <span className='flex items-center gap-1'>
                                        <FiRefreshCw />
                                        Dernière mise à jour le {updatedAt}
                                    </span>
                                )}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Sections */}
            <div className='flex flex-col flex-1'>
                {project.description && (
                    <div className='sm:px-5 px-2.5 sm:pt-5 pt-2.5 sm:pb-4 pb-2  border-t border-zinc-100'>
                        <p className={`text-sm uppercase tracking-widest mb-1.5 ${accentText}`}>Description</p>
                        <p className={`text-sm text-zinc-600 leading-relaxed border-l-2 pl-2 ${accentBorder}`}>{project.description}</p>
                    </div>
                )}

                {/* Highlights */}
                {project.highlights && project.highlights.length > 0 && (
                    <div className='sm:px-5 px-2.5 sm:pt-5 pt-2.5 sm:pb-4 pb-2  border-t border-zinc-100'>
                        <p className={`text-sm uppercase tracking-widest mb-1.5 ${accentText}`}>Compétences</p>
                        <div className={`flex flex-col gap-1 border-l-2 pl-2 ${accentBorder}`}>
                            {project.highlights.map((h) => (
                                <div key={h} className='flex items-start gap-2'>
                                    <p className='text-sm text-zinc-600'>- {h}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Technos */}
                {project.technos && project.technos.filter((t) => t !== 'to-portfolio').length > 0 && (
                    <div className='sm:px-5 px-2.5 sm:pt-5 pt-2.5 sm:pb-4 pb-2  border-t border-zinc-100'>
                        <p className={`text-sm uppercase tracking-widest mb-1.5 ${accentText}`}>Technologies</p>
                        <div className='flex flex-wrap gap-1.5'>
                            {project.technos
                                .filter((t) => t !== 'to-portfolio')
                                .map((topic) => (
                                    <span key={topic} className={`text-sm px-2 py-0.5 border ${accentBorder} ${accentText} ${accentBg}`}>
                                        {topic}
                                    </span>
                                ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Buttons */}
            {(project.websiteURL || project.sourceCodeURL) && (
                <div className='flex shrink-0 border-t border-zinc-100'>
                    {project.websiteURL && (
                        <a
                            href={project.websiteURL}
                            target='_blank'
                            rel='noreferrer'
                            className={`flex-1 flex items-center justify-center gap-2 text-sm uppercase tracking-wider py-3 ${accentText} ${accentBg} hover:opacity-80 ${project.sourceCodeURL ? `border-r ${accentBorder}` : ''}`}
                        >
                            <FaExternalLinkAlt className='text-sm' />
                            Voir site
                        </a>
                    )}
                    {project.sourceCodeURL && (
                        <a
                            href={project.sourceCodeURL}
                            target='_blank'
                            rel='noreferrer'
                            className='flex-1 flex items-center justify-center gap-2 text-sm uppercase tracking-wider py-3 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-800'
                        >
                            <FaGithub />
                            Voir code
                        </a>
                    )}
                </div>
            )}
        </motion.div>
    )
}
