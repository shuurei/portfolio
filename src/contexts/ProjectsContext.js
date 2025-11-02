import { createContext, useContext, useMemo } from 'react'

import useFetch from '@/hooks/useFetch'
import { useUser } from '@/contexts/UserContext'
import userProjects from '@/data/userProjects'

const ProjectsContext = createContext(null)

export const ProjectsProvider = ({ children }) => {
    const { profile, loading: loadingProfile } = useUser()

    const { data: repos, loading: loadingRepos } = useFetch(
        profile?.login ? `https://api.github.com/users/${profile.login}/repos` : null
    )

    const allProjects = useMemo(() => {
        return [...userProjects, ...(repos ?? [])]
    }, [repos])

    const highlightedProjects = useMemo(() => {
        return allProjects.filter((repo) => repo.topics?.includes('to-portfolio'))
    }, [allProjects])

    const projectsWithoutHighlighted = useMemo(() => {
        return allProjects.filter((repo) => !repo.topics?.includes('to-portfolio'))
    }, [allProjects])

    const loading = loadingProfile || loadingRepos

    return (
        <ProjectsContext.Provider
            value={{
                loading,
                allProjects,
                highlightedProjects,
                projectsWithoutHighlighted
            }}
        >
            {children}
        </ProjectsContext.Provider>
    )
}

export const useProjects = () => {
    const context = useContext(ProjectsContext);

    if (!context) {
        throw new Error('useProjects must be used within a ProjectsProvider');
    }

    return context;
}
