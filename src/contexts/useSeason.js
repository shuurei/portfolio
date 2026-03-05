import { useState, useEffect } from 'react';

const seasons = [
    { id: 'winter', name: 'Hiver', color: '#3096FF' },
    { id: 'spring', name: 'Printemps', color: '#7d64ff' },
    { id: 'summer', name: 'Été', color: '#ded93e' },
    { id: 'autumn', name: 'Automne', color: '#FF9930' }
];

const getCurrentSeason = () => {
    const month = new Date().getMonth();
    const seasonIndex = Math.floor(month / 3) % seasons.length;
    
    return seasons[seasonIndex];
}

const useSeason = () => {
    const [currentSeason, setCurrentSeason] = useState(getCurrentSeason);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSeason(getCurrentSeason());
        }, 1000 * 60 * 15);

        return () => clearInterval(interval);
    }, []);

    return {
        seasons,
        currentSeason
    };
};

export default useSeason;