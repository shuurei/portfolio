import Head from 'next/head'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

import Icon from '@/components/icon'
import userSkills from '@/data/userSkills'

const sections = [
    { title: 'Langages', type: 'language' },
    { title: 'Bibliothèques', type: 'library' },
    { title: 'Frameworks', type: 'framework' },
    { title: 'Outils', type: 'tools' },
    { title: "Systèmes d'exploitation", type: 'os' },
    { title: 'Autres', type: 'other' }
];

export default function Home() {
    const router = useRouter()

    const needs = useMemo(() => {
        return router.query.needs?.split(',') ?? [];
    }, [router.query.needs]);

    return (
        <>
            <Head>
                <title>Portfolio | Langages et Frameworks</title>
                <meta name='description' content='Découvrez les langages et frameworks que j’utilise' />
            </Head>

            <main className='flex flex-wrap gap-5 min-w-sm:flex-col'>
                {sections.map(({ title, type }) => {
                    const skills = userSkills
                        .filter(skill => skill.type === type)
                        .map(({ name, icon }, idx) => (
                            <div className='flex items-center flex-col gap-1' key={idx}>
                                <Icon
                                    component={icon}
                                    className={
                                        needs.length ?
                                            needs.includes(name.toLowerCase())
                                                ? 'text-green-400 animate-pulse'
                                                : 'text-accent/70'
                                            : 'text-accent'
                                    }
                                    size={64}
                                />
                                <p className='text-lg'>{name}</p>
                            </div>
                        ));

                    return (
                        <div className='flex flex-col gap-4 flex-auto min-w-sm:min-w-sm' key={type}>
                            <div className='bevel-bl flex justify-between bg-accent text-2xl xs:text-3xl -tracking-tight font-bold px-3 py-1 uppercase text-black'>
                                <h2 className='font-iceland'>{skills.length} {title}</h2>
                            </div>
                            <div className='flex flex-wrap justify-center gap-4'>
                                {skills}
                            </div>
                        </div>
                    )
                })}
            </main>
        </>
    );
}
