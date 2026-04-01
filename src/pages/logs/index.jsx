import Head from 'next/head'

import { BsBuildingFill } from 'react-icons/bs'
import { FaGraduationCap } from 'react-icons/fa'

import userInfo from '@/data/userInfo'

export default function Home() {
    return (
        <>
            <Head>
                <title>Portfolio | Logs</title>
                <meta name='description' content='Portfolio - Logs' />
            </Head>

            <main className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    <div className='bevel-bl flex justify-between bg-accent text-2xl xs:text-3xl -tracking-tight font-bold px-3 py-1 uppercase text-black'>
                        <h2 className='font-iceland'>{userInfo.experiences.length} Expériences</h2>
                    </div>
                    <div className='flex flex-wrap gap-4'>
                        <ul className='columns-sm gap-2'>
                            {userInfo.experiences.map(({ title, description, startAt, endAt }, idx) => (
                                <li key={idx} className='first:mt-0 mt-2 break-inside-avoid'>
                                    <div className='bevel-tr dark:bg-accent/30 bg-accent/13 p-0.5' key={idx}>
                                        <div className='bevel-tr p-4 flex flex-col gap-1 dark:bg-black/65 not-dark:bg-white/50'>
                                            <div className='flex flex-col gap-1'>
                                                <div className='flex gap-1'>
                                                    <BsBuildingFill className='text-accent' size={32} />
                                                    <h4 className='font-bigShouldersDisplay text-2xl text-accent uppercase font-bold'>{title}</h4>
                                                </div>
                                                <p className='text-sm dark:text-white/90'>{new Date(startAt).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })} - {endAt ? new Date(endAt).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' }) : 'Maintenant'}</p>
                                            </div>
                                            <p className='dark:text-white/75 text-black/60'>{description}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <div className='bevel-bl flex justify-between bg-accent text-2xl xs:text-3xl -tracking-tight font-bold px-3 py-1 uppercase text-black'>
                        <h2 className='font-iceland'>{userInfo.diplomas.length} Diplôme</h2>
                    </div>
                    <div className='flex flex-wrap gap-4'>
                        <ul className='columns-sm gap-2'>
                             {userInfo.diplomas.map(({ title, description, startAt, endAt, degrees, school }, idx) => (
                                <li key={idx} className='first:mt-0 mt-2 break-inside-avoid'>
                                    <div className='bevel-tr dark:bg-accent/30 bg-accent/13 p-0.5' key={idx}>
                                        <div className='bevel-tr p-4 flex flex-col gap-1 dark:bg-black/65 not-dark:bg-white/50'>
                                            <div className='flex flex-col gap-1'>
                                                <div className='flex gap-1'>
                                                    <FaGraduationCap className='text-accent' size={32} />
                                                    <div>
                                                        <h4 className='font-bigShouldersDisplay text-2xl text-accent uppercase font-bold'>{title}</h4>
                                                        <div className='flex flex-wrap gap-1 items-center dark:text-white/90'>
                                                            {school && <p>École {school}</p>}
                                                            <p className='text-sm'>{new Date(startAt).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })} - {endAt ? new Date(endAt).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' }) : 'Maintenant'}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flex flex-col'>
                                                <p className='text-xl dark:text-white'>{degrees}</p>
                                                <p className='dark:text-white/75 text-black/60'>{description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </main>
        </>
    );
}
