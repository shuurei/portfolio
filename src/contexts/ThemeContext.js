import { createContext, useContext, useState, useEffect } from 'react'

import useSeason from '@/utils/season'

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
    const { currentSeason } = useSeason();

    const [currentTheme, setCurrentTheme] = useState(currentSeason.color);
    const [isSeasonTheme, setIsSeasonTheme] = useState(true);

    const [mode, setMode] = useState(() => {
        if (typeof window === 'undefined') return 'dark';

        const stored = localStorage.getItem('mode');
        if (stored === 'dark' || stored === 'light') return stored;

        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    const setSeasonTheme = () => {
        setIsSeasonTheme(true);
        setCurrentTheme(currentSeason.color);
    };

    const setCustomTheme = (color) => {
        setIsSeasonTheme(false);
        setCurrentTheme(color);
    };

    const setCyberpunkTheme = () => setCustomTheme('#FF5D5D');

    useEffect(() => {
        const root = document.documentElement;

        if (mode === 'dark') {
            root.setAttribute('data-theme', 'dark');
        } else {
            root.setAttribute('data-theme', 'light');
        }

        localStorage.setItem('mode', mode);
    }, [mode]);

    useEffect(() => {
        document.documentElement.style = `--accent-season: ${currentTheme}`;
    }, [currentTheme]);

    return (
        <ThemeContext.Provider value={{
            mode,
            currentTheme,
            isSeasonTheme,
            setSeasonTheme,
            setCyberpunkTheme,
            setMode
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
