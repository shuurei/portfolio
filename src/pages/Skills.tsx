import { SEO } from '@/components/SEO'

import { useProjects } from '@/contexts/ProjectsContext'
import { useEffect } from 'react';

export default function SkillsPage() {
    const x = useProjects();

    useEffect(() => console.log(x), [x])

    return (
        <>
            <SEO
                title='Compétences'
                description='Simple description'
            />
        </>
    );
}