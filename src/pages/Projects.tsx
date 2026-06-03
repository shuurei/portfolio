import { motion } from 'motion/react'
import { useState, useMemo } from 'react'

import { useProjects } from '@/contexts/ProjectsContext'

import { SEO } from '@/components/SEO'
import Card from '@/components/common/Card'
import ProjectCard from '@/components/ProjectCard'

export default function ProjectsPage() {
    const { projects, highlightedProjects, projectsWithoutHighlighted, loading, error } = useProjects();
    const [search, setSearch] = useState('');

    const filteredProjects = useMemo(() => {
        return projects.filter((p) =>
            search.trim() === '' ||
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.description?.toLowerCase().includes(search.toLowerCase()) ||
            p.language?.toLowerCase().includes(search.toLowerCase()) ||
            [...p?.topics ?? [], ...p?.technos ?? []].some((t) => t.toLowerCase().includes(search.toLowerCase()))
        );
    }, [search]);

    if (loading) {
        return (
            <main className='w-full max-w-7xl mx-auto px-6 py-16'>
                <p className='text-sm text-zinc-400'>Chargement..</p>
            </main>
        )
    }

    if (error) {
        return (
            <main className='w-full max-w-7xl mx-auto px-6 py-16'>
                <p className='text-sm text-red-400'>{error}</p>
            </main>
        )
    }

    return (
        <>
            <SEO title='Projets' description='Mes projets personnels et mis en avant.' />

            <main className='w-full max-w-7xl mx-auto md:px-6 px-4 py-6 md:py-10 flex flex-col md:gap-8 gap-6'>
                <div className='relative'>
                    <motion.input
                        type='text'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder='Rechercher par nom, langage, tech..'
                        className='w-full font-mono text-sm px-4 py-2.5 border border-zinc-200 bg-zinc-50 text-zinc-700 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400'
                        initial={{ opacity: 0, x: 25 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'backInOut' }}
                    />
                </div>

                {
                    (search.length == 0) ? (
                        <>
                            {highlightedProjects.length > 0 && (
                                <Card delay={0} className='gap-3 md:gap-6'>
                                    <div>
                                        <h2 className='text-2xl font-bold text-zinc-800'>Mis en avant</h2>
                                        <p className='text-sm text-zinc-400 mt-1'>Les projets dont je suis le plus fier</p>
                                    </div>
                                    <ul className='columns-1 md:columns-2 gap-4'>
                                        {highlightedProjects.map((project) => (
                                            <li key={project.name} className='mb-4 break-inside-avoid'>
                                                <ProjectCard project={project} />
                                            </li>
                                        ))}
                                    </ul>
                                </Card>
                            )}

                            {highlightedProjects.length > 0 && (
                                <Card delay={0} className='gap-3 md:gap-6'>
                                    <div>
                                        <h2 className='text-2xl font-bold text-zinc-800'>Derniers projets</h2>
                                        <p className='text-sm text-zinc-400 mt-1'>Mes deux derniers projets</p>
                                    </div>
                                    <ul className='columns-1 md:columns-2 gap-4'>
                                        {projectsWithoutHighlighted.slice(0, 2).map((project) => (
                                            <li key={project.name} className='mb-4 break-inside-avoid'>
                                                <ProjectCard project={project} />
                                            </li>
                                        ))}
                                    </ul>
                                </Card>
                            )}

                            {projectsWithoutHighlighted.length > 0 && (
                                <Card delay={0.1} className='gap-3 md:gap-6'>
                                    <div>
                                        <h2 className='text-2xl font-bold text-zinc-800'>{projectsWithoutHighlighted.length} Projets personnels</h2>
                                        <p className='text-sm text-zinc-400 mt-1'>Tous mes autres projets</p>
                                    </div>
                                    <ul className='columns-1 md:columns-2 gap-4'>
                                        {projectsWithoutHighlighted.slice(2).map((project) => (
                                            <li key={project.name} className='mb-4 break-inside-avoid'>
                                                <ProjectCard project={project} />
                                            </li>
                                        ))}
                                    </ul>
                                </Card>
                            )}
                        </>
                    ) : (
                        <Card className='gap-3 md:gap-6'>
                            <h2 className='text-2xl font-bold text-zinc-800'>{filteredProjects.length} Projets trouvés</h2>
                            <ul className='columns-1 md:columns-2 gap-4'>
                                {(filteredProjects.length === 0) ? (
                                    <p className='text-sm text-zinc-400 font-mono'>Aucun projet trouvé pour "{search}"</p>
                                ) : (filteredProjects.map((project) => (
                                    <li key={project.name} className='mb-4 break-inside-avoid'>
                                        <ProjectCard project={project} />
                                    </li>
                                )))}
                            </ul>
                        </Card>
                    )
                }
            </main>
        </>
    )
}