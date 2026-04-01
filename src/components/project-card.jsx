import Button from '@/components/common/button.jsx'

import { GitHub } from '@mui/icons-material'
import { Star } from '@mui/icons-material'
import { Web } from '@mui/icons-material'

import { PiGitFork } from 'react-icons/pi'
import { FaCode, FaClock } from 'react-icons/fa6'
import { TiLightbulb } from 'react-icons/ti'
import { FaLock } from 'react-icons/fa'
import { PiTextAlignLeft } from 'react-icons/pi'

const ProjectCard = (props) => {
    const {
        title,
        description,
        githubLink,
        href,
        language,
        technos,
        starsCount,
        createdAt,
        isFork,
        highlights
    } = props

    return (
        <div className='bevel-tr dark:bg-accent/30 bg-accent/13  p-0.5'>
            <div className='bevel-tr p-4 flex flex-col gap-2 dark:bg-black/65 bg-white/50'>
                <div className='flex flex-col gap-2'>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center gap-1'>
                            {!(href || githubLink) && (
                                <div className='bg-accent/30 p-2 rounded-md'>
                                    <FaLock size={20} className='text-accent/90' />
                                </div>
                            )}
                            <h4 className='font-bigShouldersDisplay text-2xl text-accent uppercase font-bold'>// {title.replaceAll('-', ' ')}</h4>
                        </div>
                        <div className='flex items-center gap-2'>
                            {starsCount > 0 && (
                                <div className='flex items-center gap-1 text-accent' >
                                    <Star />
                                    <p className='font-bold text-lg'>{starsCount}</p>
                                </div>
                            )}
                            {isFork && <PiGitFork size={24} className='text-accent' />}
                        </div>
                    </div>

                    <div className='flex flex-wrap gap-2'>
                        {language && <p className='text-lg font-semibold bg-accent/20 w-fit px-2 py-0.5 text-accent rounded-lg'>{language}</p>}                        
                        <div className='px-1.5 py-1 flex items-center gap-1 bg-accent/20 w-fit rounded-lg'>
                            <FaClock className='text-accent' size={16} />
                            <p className='text-accent'>{new Date(createdAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</p>
                        </div>
                    </div>

                    {description && (
                        <div>
                            <div className='flex items-center gap-2'>
                                <div className='flex items-center gap-2'>
                                    <div className='dark:bg-accent/35 bg-accent/20 px-1.5 py-1 rounded-lg'>
                                        <PiTextAlignLeft className='text-accent' size={18} />
                                    </div>
                                    <h3 className='text-xl text-accent'>Description</h3>
                                </div>
                                <div className='border-2 dark:border-accent/87 border-accent/20 w-full bevel-br'></div>
                            </div>
                            <p className='dark:text-white/75 text-black/60'>{description}</p>
                        </div>
                    )}
                </div>

                {highlights?.length > 0 && (
                    <div className='flex flex-col gap-1.5'>
                        <div className='flex items-center gap-2'>
                            <div className='flex items-center gap-2'>
                                <div className='dark:bg-accent/35 bg-accent/20 px-1.5 py-1 rounded-lg'>
                                    <TiLightbulb className='text-accent' size={18} />
                                </div>
                                <h3 className='text-xl text-accent'>Compétences</h3>
                            </div>
                            <div className='border-2 dark:border-accent/87 border-accent/20 w-full bevel-br'></div>
                        </div>

                        <ul className='flex flex-col gap-1'>
                            {highlights.map((item, idx) => (
                                <li key={idx} className='flex gap-2 dark:text-white/75 text-black/65'>
                                    <span className='text-accent font-bold'>—</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {technos?.length > 0 && (
                    <div className='flex flex-col gap-1.5'>
                        <div className='flex items-center gap-2'>
                            <div className='flex items-center gap-2'>
                                <div className='dark:bg-accent/35 bg-accent/20 px-1.5 py-1 rounded-lg'>
                                    <FaCode className='text-accent' size={18} />
                                </div>
                                <h3 className='text-xl text-accent'>Technos</h3>
                            </div>
                            <div className='border-2 dark:border-accent/87 border-accent/20 w-full bevel-br'></div>
                        </div>
                        <div className='flex flex-wrap gap-2'>
                            {technos?.map((name, idx) => (
                                <div className='dark:bg-accent/20 bg-accent/13 px-2 py-1 bevel-br' key={idx}>
                                    <span className='text-accent'>{name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {(githubLink || href) && <div className='flex flex-wrap gap-2 mt-1'>
                    {githubLink && (
                        <Button className='flex-1 min-w-35' href={githubLink}>
                            <div className='flex items-center justify-between'>
                                <p>Voir le code</p>
                                <GitHub fontSize='medium' />
                            </div>
                        </Button>
                    )}
                    {href && (
                        <Button className='flex-1 min-w-35' href={href}>
                            <div className='flex items-center justify-between'>
                                <p>Voir le site</p>
                                <Web fontSize='medium' />
                            </div>
                        </Button>
                    )}
                </div>}
            </div>
        </div>
    );
}

export default ProjectCard;