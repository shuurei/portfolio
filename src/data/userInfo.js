import { SiGithub } from 'react-icons/si'
import { GrLinkedin } from 'react-icons/gr'

const userInfo = {
    githubId: 73862313,
    avatarPath: (currentSeasonId) => `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/avatars/${currentSeasonId ?? 'winter'}.png`,
    localisation: 'Nantes 44',
    old: Math.floor((new Date() - new Date(2005, 9, 27)) / (1000 * 60 * 60 * 24 * 365)),
    email: 'lenny.lqs.pro@gmail.com',
    network: [
        {
            icon: GrLinkedin,
            name: 'LinkedIn',
            link: 'https://www.linkedin.com/in/lennylqs'
        },
        {
            icon: SiGithub,
            name: 'GitHub',
            link: 'https://github.com/'
        }
    ],
    experiences: [
        {
            title: 'Apprenti Développeur Full-Stack',
            description: 'Développement et maintenance de \" NeoCampus \", la plateforme collaborative des étudiants et enseignants de l\'École de Design Nantes Atlantique. Participation à la conception de nouvelles fonctionnalités, à l\'amélioration de l\'interface et au développement full-stack de l\'application',
            startAt: '02/20/2024',
            endAt: '01/15/2025',
        },
        {
            title: 'Service Civique - Ambassadeur du numérique',
            description: "Animation d'ateliers numériques pour initier au web, renforcer les compétences informatiques, et promouvoir le lien intergénérationnel autour des outils numériques.",
            startAt: '10/01/2022',
            endAt: '06/01/2023',
        },
    ],
    diplomas: [
        {
            title: "Concepteur Développeur D'application",
            description: "Formation orientée développement full-stack et conception d'applications, avec une approche centrée sur l'architecture logicielle, les bases de données, les API et les interfaces web. Réalisation de projets concrets en équipe et en autonomie autour de technologies comme JavaScript, TypeScript, React, Node.js et SQL",
            degrees: 'Bac +3',
            school: 'ARINFO',
            startAt: '09/25/2023',
            endAt: '11/15/2024',
        }
    ]
}

export default userInfo;