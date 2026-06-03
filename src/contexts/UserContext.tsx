import { createContext, useContext, useEffect, useState } from 'react'

type GithubUser = {
    id: number
    login: string
    name: string | null
    avatar_url: string
    bio: string | null
    html_url: string
    public_repos: number
    followers: number
    following: number
}

type UserContextType = {
    user: GithubUser | null
    loading: boolean
    error: string | null
}

const UserContext = createContext<UserContextType | null>(null)

const GITHUB_ID = '73862313'
const CACHE_KEY = 'user'
const CACHE_TTL = 1000 * 60 * 60

function getCache(): { data: GithubUser; timestamp: number } | null {
    const cached = localStorage.getItem(CACHE_KEY)
    if (!cached) return null
    const parsed = JSON.parse(cached)
    if (Date.now() - parsed.timestamp > CACHE_TTL) return null
    return parsed
}

export function UserProvider({ children }: { children: React.ReactNode }) {
    const initial = getCache();

    const [user, setUser] = useState<GithubUser | null>(initial?.data ?? null)
    const [loading, setLoading] = useState(!initial)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (getCache()) return

        fetch(`https://api.github.com/user/${GITHUB_ID}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Erreur lors de la récupération du profil');
                };

                return res.json();
            })
            .then((data: GithubUser) => {
                setUser(data);
                localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return (
        <UserContext.Provider value={{ user, loading, error }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const ctx = useContext(UserContext);
    if (!ctx) {
        throw new Error('useUser must be used inside UserProvider')
    };

    return ctx;
}