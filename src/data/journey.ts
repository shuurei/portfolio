interface Experience {
    type: string;
    title: string;
    description: string;
    location: string;
    startAt: string;
    endAt: string;
}

interface Diplomas {
    title: string;
    description: string;
    degrees: string;
    school: string;
    startAt: string;
    endAt: string;
}

export const experiences : Experience[] = [
    {
        type: 'Alternance',
        title: 'Développeur Full-Stack',
        description: 'Développement et maintenance de " NeoCampus ", la plateforme collaborative des étudiants et enseignants de l\'École de Design Nantes Atlantique. Participation à la conception de nouvelles fonctionnalités, à l\'amélioration de l\'interface et au développement full-stack de l\'application',
        location: "L'École de Design Nantes Atlantique",
        startAt: '02/20/2024',
        endAt: '01/15/2025',
    },
    {
        type: 'Service Civique',
        title: 'Ambassadeur du numérique',
        description: "Animation d'ateliers numériques pour initier au web, renforcer les compétences informatiques, et promouvoir le lien intergénérationnel autour des outils numériques.",
        location: 'Nantes',
        startAt: '10/01/2022',
        endAt: '06/01/2023',
    },
] as const;

export const diplomas : Diplomas[] = [
    {
        title: "Concepteur Développeur D'application",
        description: "Formation orientée développement full-stack et conception d'applications, avec une approche centrée sur l'architecture logicielle, les bases de données, les API et les interfaces web. Réalisation de projets concrets en équipe et en autonomie autour de technologies comme JavaScript, TypeScript, React, Node.js et SQL",
        degrees: 'Bac +3',
        school: 'ARINFO',
        startAt: '09/25/2023',
        endAt: '11/15/2024',
    }
] as const;