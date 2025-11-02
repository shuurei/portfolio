import { createContext, useContext } from 'react'

import useFetch from '@/hooks/useFetch'
import userInfo from '@/data/userInfo'

const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
    const { data: profile, loading, error } = useFetch(
        `https://api.github.com/user/${userInfo.githubId}`
    )

    return (
        <UserContext.Provider value={{ profile, loading, error }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext)
    
    if (!context) {
        throw new Error('useUser must be used within a UserProvider')
    }

    return context
}
