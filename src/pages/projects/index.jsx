import Head from 'next/head'

import ProjectCard from '@/components/project-card'
import { useProjects } from '@/contexts/ProjectsContext'

export default function Home() {
    const { loading, highlightedProjects, projectsWithoutHighlighted } = useProjects();

    return (
        <>
            <Head>
                <title>Portfolio | Projets</title>
                <meta name='description' content='Portfolio - Projets' />
            </Head>

            <main>
                {loading ? (
                    <p>Chargement en cours..</p>
                ) : (
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-2'>
                            <div className='bevel-bl flex justify-between bg-accent text-2xl xs:text-3xl -tracking-tight font-bold px-3 py-1 uppercase text-black'>
                                <h2 className='font-iceland'>{highlightedProjects.length} Projets mis en avant</h2>
                            </div>
                            <ul className='columns-sm gap-2'>
                                {highlightedProjects.map((project, idx) => (
                                    <li key={idx} className='first:mt-0 mt-2 break-inside-avoid'>
                                        <ProjectCard
                                            {...project}
                                            title={project.name}
                                            githubLink={project.html_url}
                                            href={project.homepage}
                                            starsCount={project.stargazers_count}
                                            createdAt={project.created_at}
                                            isFork={project.fork}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <div className='bevel-bl flex justify-between bg-accent text-2xl xs:text-3xl -tracking-tight font-bold px-3 py-1 uppercase text-black'>
                                <h2 className='font-iceland'>{projectsWithoutHighlighted.length} Projets personnel</h2>
                            </div>
                            <ul className='columns-sm gap-2'>
                                {projectsWithoutHighlighted.map((project, idx) => (
                                    <li key={idx} className='first:mt-0 mt-2 break-inside-avoid'>
                                        <ProjectCard
                                            {...project}
                                            title={project.name}
                                            githubLink={project.html_url}
                                            href={project.homepage}
                                            starsCount={project.stargazers_count}
                                            createdAt={project.created_at}
                                            isFork={project.fork}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}
