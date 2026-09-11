import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useUser } from './UserContext'

import { githubOverride, otherProjects } from '@/data/projects'

interface RepoGithub {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    homepage?: string;
    topics: string[];
    language: string | null;
    stargazers_count: number;
    updated_at: string;
    created_at: string;
}

export interface Project {
    name: string
    description: string
    language?: string
    starsCount?: number;
    sourceCodeURL?: string
    websiteURL?: string
    topics?: string[]
    technos?: string[]
    highlights?: string[]
    updatedAt?: string
    createdAt?: string
}

interface ProjectsContextType {
    repos: RepoGithub[];
    projects: Project[];
    highlightedProjects: Project[];
    projectsWithoutHighlighted: Project[];
    loading: boolean;
    error: string | null;
}

const ProjectsContext = createContext<ProjectsContextType | null>(null)

const CACHE_KEY = 'projects'
const CACHE_TTL = 1000 * 60 * 10

function getCache(): { data: RepoGithub[]; timestamp: number } | null {
    const cached = localStorage.getItem(CACHE_KEY)
    if (!cached) return null
    const parsed = JSON.parse(cached)
    if (Date.now() - parsed.timestamp > CACHE_TTL) return null
    return parsed
}

function repoToProject(repo: RepoGithub) {
    return {
        name: repo.name,
        description: repo.description,
        language: repo?.language,
        starsCount: repo.stargazers_count,
        sourceCodeURL: repo.html_url,
        websiteURL: (repo?.homepage?.length ?? 0) > 0 ? repo.homepage : null,
        topics: repo.topics,
        updatedAt: repo.updated_at,
        createdAt: repo.created_at,
    } as Project
}

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
    const initial = getCache();

    const [repos, setRepos] = useState<RepoGithub[]>(initial?.data ?? []);
    const [loadingRepo, setLoadingRepo] = useState(!initial);
    const [error, setError] = useState<string | null>(null);

    const { user, loading: loadingUser } = useUser();

    useEffect(() => {
        if (!user || getCache()) return

        fetch(`https://api.github.com/users/${user.login}/repos`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Erreur lors de la récupération des repos');
                }

                return res.json();
            })
            .then((data: RepoGithub[]) => {
                data = data.filter(({ name }) => name !== user?.login);

                setRepos(() => data);
                localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoadingRepo(false))
    }, [user]);

    const projects = useMemo<Project[]>(() => {
        const reposAsProjects = repos.map((repo) => {
            const override = githubOverride[repo.id]
            return override
                ? { ...repoToProject(repo), ...override }
                : repoToProject(repo)
        });

        return [...otherProjects, ...reposAsProjects].sort((a, b) => {
            const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
            const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;

            return dateB - dateA;
        });
    }, [repos]);

    const highlightedProjects = useMemo(() => {
        return projects.filter((p) => p.topics?.includes('to-portfolio'));
    }, [projects]);

    const projectsWithoutHighlighted = useMemo(() => {
        return projects.filter((p) => !p.topics?.includes('to-portfolio'));
    }, [projects]);

    return (
        <ProjectsContext.Provider value={{
            repos,
            projects,
            highlightedProjects,
            projectsWithoutHighlighted,
            loading: loadingUser || loadingRepo,
            error
        }}>
            {children}
        </ProjectsContext.Provider>
    );
}

export function useProjects() {
    const ctx = useContext(ProjectsContext)
    if (!ctx) {
        throw new Error('useProjects must be used inside ProjectsProvider')
    }

    return ctx;
}