import { createContext, useContext, useState, useEffect } from 'react'

import useSeason from '@/contexts/useSeason'

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
    const { seasons, currentSeason } = useSeason();

    const [themeType, setThemeType] = useState(null);
    const [selectedSeason, setSelectedSeason] = useState(null);
    const [currentTheme, setCurrentTheme] = useState(null);

    const [mode, setMode] = useState(null);

    const applySeasonTheme = (id) => {
        const season = seasons.find((season) => season.id === id);
        if (!season) return

        setThemeType('season');
        setSelectedSeason(id);
        setCurrentTheme(season.color);
    }

    const applyCustomTheme = (themeId) => {
        setThemeType(themeId);

        switch (themeId) {
            case 'cyberpunk': {
                return setCurrentTheme('#FF5D5D');
            }
            case 'fallout': {
                return setCurrentTheme('#0BE10B');
            }
        }
    }

    const setTheme = (themeId) => {
        if (seasons.find(({ id }) => id === themeId)) {
            applySeasonTheme(themeId);
        } else {
            applyCustomTheme(themeId);
        }

        localStorage.setItem('theme-updated-at', Date.now());
    };

    useEffect(() => {
        if (!mode) return;

        const root = document.documentElement;

        if (mode === 'dark') {
            root.setAttribute('data-theme', 'dark');
        } else {
            root.setAttribute('data-theme', 'light');
        }

        localStorage.setItem('theme-mode', mode);
    }, [mode]);

    useEffect(() => {
        document.documentElement.style.setProperty('--accent-season', currentTheme);

        if (themeType) {
            localStorage.setItem('theme-type', themeType);

            if (themeType === 'season') {
                localStorage.setItem('selected-season', selectedSeason);
            } else {
                localStorage.removeItem('selected-season');
            }
        }
    }, [currentTheme]);

    useEffect(() => {
        setMode(localStorage.getItem('theme-mode') ?? 'dark');

        const savedThemeType = localStorage.getItem('theme-type');
        if (savedThemeType) {
            setThemeType(savedThemeType);

            if (savedThemeType === 'season') {
                const savedSeason = localStorage.getItem('selected-season');

                if (savedSeason) {
                    applySeasonTheme(savedSeason);
                } else {
                    applySeasonTheme(currentSeason.name);
                }
            } else {
                applyCustomTheme(savedThemeType);
            }
        } else {
            applySeasonTheme(currentSeason.id);
        }
    }, []);

    return (
        <ThemeContext.Provider value={{
            mode,
            currentTheme,
            isSeasonTheme: themeType === 'season',
            themeType,
            selectedSeason,
            setTheme,
            setMode
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
