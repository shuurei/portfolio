import type { IconType } from 'react-icons'
import {
    SiArchlinux,
    SiCplusplus,
    SiCss,
    SiDbeaver,
    SiDebian,
    SiDocker,
    SiFigma,
    SiGit,
    SiGodotengine,
    SiHtml5,
    SiJavascript,
    SiJson,
    SiLaravel,
    SiMysql,
    SiNextdotjs,
    SiNodedotjs,
    SiPhp,
    SiPrisma,
    SiPython,
    SiReact,
    SiSequelize,
    SiSymfony,
    SiTypescript,
    SiUbuntu,
    SiVuedotjs,
} from 'react-icons/si'

type SkillType = 'language' | 'framework' | 'tool' | 'os' | 'other';

interface Skill {
    type: SkillType;
    name: string;
    icon: IconType;
    years?: number;
}

export const skills: Skill[] = [
    {
        type: 'language',
        name: 'HTML',
        icon: SiHtml5
    },
    {
        type: 'language',
        name: 'CSS',
        icon: SiCss,
        years: 4
    },
    {
        type: 'language',
        name: 'Python',
        icon: SiPython
    },
    {
        type: 'language',
        name: 'C++',
        icon: SiCplusplus
    },
    {
        type: 'language',
        name: 'JSON',
        icon: SiJson
    },
    {
        type: 'framework',
        name: 'React',
        icon: SiReact,
        years: 3
    },
    {
        type: 'framework',
        name: 'React-Native',
        icon: SiReact,
        years: 2
    },
    {
        type: 'framework',
        name: 'VueJs',
        icon: SiVuedotjs,
        years: 2
    },
    {
        type: 'framework',
        name: 'Symfony',
        icon: SiSymfony,
        years: 1
    },
    {
        type: 'framework',
        name: 'Laravel',
        icon: SiLaravel,
        years: 1
    },
    {
        type: 'language',
        name: 'PHP',
        icon: SiPhp,
        years: 1
    },
    {
        type: 'framework',
        name: 'NextJs',
        icon: SiNextdotjs,
    },
    {
        type: 'language',
        name: 'GDScript',
        icon: SiGodotengine
    },
    {
        type: 'language',
        name: 'JavaScript',
        icon: SiJavascript,
        years: 5
    },
    {
        type: 'language',
        name: 'TypeScript',
        icon: SiTypescript,
        years: 2
    },
    {
        type: 'language',
        name: 'SQL',
        icon: SiMysql
    },
    {
        type: 'framework',
        name: 'Sequelize',
        icon: SiSequelize
    },
    {
        type: 'framework',
        name: 'Prisma',
        icon: SiPrisma
    },
    {
        type: 'tool',
        name: 'Figma',
        icon: SiFigma
    },
    {
        type: 'tool',
        name: 'Git',
        icon: SiGit
    },
    {
        type: 'tool',
        name: 'DBeaver',
        icon: SiDbeaver
    },
    {
        type: 'os',
        name: 'Arch Linux',
        icon: SiArchlinux
    },
    {
        type: 'os',
        name: 'Ubuntu',
        icon: SiUbuntu,
        years: 2
    },
    {
        type: 'os',
        name: 'Debian',
        icon: SiDebian
    },
    {
        type: 'other',
        name: 'NodeJs',
        icon: SiNodedotjs,
        years: 5
    },
    {
        type: 'other',
        name: 'Docker',
        icon: SiDocker,
        years: 1
    }
];

export const softSkills: string[] = [
    'Autonomie',
    'Travail en équipe',
    'Curiosité',
    'Adaptabilité',
    'Communication',
    'Rigueur',
];