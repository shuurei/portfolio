import Head from 'next/head'
import { useRouter } from 'next/router'

import Icon from '@/components/icon'
import userSkills from '@/data/userSkills'
import { useMemo } from 'react'

const sections = [
    { title: 'Langages', type: 'language' },
    { title: 'Bibliothèques', type: 'library' },
    { title: 'Frameworks', type: 'framework' },
    { title: 'Outils', type: 'tools' },
    { title: "Systèmes d'exploitation", type: 'os' },
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

            <main className='flex flex-wrap gap-5'>
                {sections.map(({ title, type }) => (
                    <div className='flex flex-col gap-4 flex-auto min-w-sm' key={type}>
                        <div className='bevel-bl flex justify-between bg-accent text-2xl xs:text-3xl -tracking-tight font-bold px-3 py-1 uppercase text-black'>
                            <h2 className='font-iceland'>{title}</h2>
                        </div>
                        <div className='flex flex-wrap justify-center gap-4'>
                            {userSkills
                                .filter(skill => skill.type === type)
                                .map(({ name, icon }, idx) => (
                                    <div className='flex items-center flex-col gap-1' key={idx}>
                                        <Icon component={icon} className={needs.includes(name.toLowerCase()) ? 'text-green-400 animate-pulse' : 'text-accent'} size={64} />
                                        <p className='text-lg'>{name}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </main>
        </>
    );
}
