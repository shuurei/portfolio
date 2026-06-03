import type { IconType } from 'react-icons'

import { SiGithub } from 'react-icons/si'
import { GrLinkedin } from 'react-icons/gr'

export interface Network {
    icon: IconType;
    name: string;
    username?: string;
    link: string;
}

export const me = {
    githubId: 73862313,
    localisation: 'Nantes 44',
    old: Math.floor((new Date().getTime() - new Date(2005, 9, 27).getTime()) / (1000 * 60 * 60 * 24 * 365)),
    email: 'lenny.lqs.pro@gmail.com',
    network: [
        {
            icon: GrLinkedin,
            name: 'LinkedIn',
            username: 'lennylqs',
            link: 'https://www.linkedin.com/in/lennylqs'
        },
        {
            icon: SiGithub,
            name: 'GitHub',
            link: 'https://github.com/'
        }
    ] as Network[]
} as const;