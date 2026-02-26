import { createContext, useContext, useState, useEffect } from 'react'

import useSeason from '@/utils/season'

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
    const { seasons, currentSeason } = useSeason();

    const [themeType, setThemeType] = useState('season');
    const [selectedSeason, setSelectedSeason] = useState(currentSeason.id);
    const [currentTheme, setCurrentTheme] = useState(currentSeason.color);

    const [mode, setMode] = useState('dark');

    const setSeasonTheme = (id) => {
        const season = seasons.find((season) => season.id === id);
        if (!season) return

        setThemeType('season');
        setSelectedSeason(id);
        setCurrentTheme(season.color);
    }

    const setCyberpunkTheme = () => {
        setThemeType('cyberpunk');
        setCurrentTheme('#FF5D5D');
    };

    const setFalloutTheme = () => {
        setThemeType('fallout');
        setCurrentTheme('#0BE10B');
    };

    useEffect(() => {
        const root = document.documentElement;

        if (mode === 'dark') {
            root.setAttribute('data-theme', 'dark');
        } else {
            root.setAttribute('data-theme', 'light');
        }
    }, [mode]);

    useEffect(() => {
        document.documentElement.style = `--accent-season: ${currentTheme}`;
    }, [currentTheme]);

    return (
        <ThemeContext.Provider value={{
            mode,
            currentTheme,
            isSeasonTheme: themeType === 'season',
            themeType,
            selectedSeason,
            setSeasonTheme,
            setCyberpunkTheme,
            setFalloutTheme,
            setMode
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
