import { Document, Link, Text, Page, Path, View, Svg, Image } from '@react-pdf/renderer'
import { createTw } from 'react-pdf-tailwind'

import { MdEmail, MdMap } from 'react-icons/md'
import { GrGithub, GrLinkedin } from 'react-icons/gr'
import { FaCar, FaCode, FaPhoneAlt } from 'react-icons/fa'
import { me, type Network } from '@/data/me'
import type { IconType } from 'react-icons'

const getContactItems = ({
    phoneNumber,
    github,
    linkedIn
}: {
    phoneNumber?: string | null;
    github?: Network;
    linkedIn?: Network;
}) => {
    const items: unknown[] = [
        {
            icon: MdEmail,
            value: me.email,
            href: `mailto:${me.email}`,
        },
        {
            icon: MdMap,
            value: me.localisation,
            href: 'https://maps.app.goo.gl/s5o2JCjBUD2J7c5T6'
        },
        {
            icon: FaCar,
            value: 'Permis B en cours',
        },
    ]

    if (phoneNumber) {
        items.unshift({
            icon: FaPhoneAlt,
            value: phoneNumber.replace(/(\d{2})(?=\d)/g, '$1 '),
            href: `tel:${phoneNumber}`,
        });
    }

    if (linkedIn) {
        items.push({
            icon: GrLinkedin,
            value: `linkedin.com/in/${linkedIn.username}`,
            href: linkedIn.link,
        });
    }

    if (github) {
        items.push({
            icon: GrGithub,
            value: `github.com/${github.username}`,
            href: github.link,
        });

        const portfolioValue = `${github.username}.github.io/portfolio`
        items.push({
            icon: FaCode,
            value: portfolioValue,
            href: `https://${portfolioValue}`
        });
    }

    return items as ({
        icon: IconType;
        value: string;
        href: string;
    })[];
}

const projects = [
    {
        type: 'Bot Discord',
        title: 'Erelya',
        stack: ['TypeScript', 'Prisma', 'NodeJs', 'MySQL'],
        points: [
            'Déploiement du projet avec Docker',
            "Conception d'un bot Discord modulaire et Open-Source",
            "Mise en place d'une base de données avec Prisma et MySQL"
        ]
    },
    {
        type: 'Site Fictif',
        title: "Minim'Ow Bar",
        stack: ['TypeScript', 'React', 'Tailwind'],
        points: [
            "Conception d'un site vitrine fictif pour un bar à chats",
            "Création d'une interface moderne et responsive avec React",
            "Développement de pages dédiées au menu, aux réservations et aux chats"
        ]
    },
    {
        type: 'Réseau Social',
        title: "Lara Weeb",
        stack: ['Laravel', 'VueJs', 'Pinia', 'MySQL'],
        points: [
            "Gestion des utilisateurs, publications et interactions",
            "Conception d'un réseau social autour de la culture manga",
            "Développement d'une interface dynamique avec VueJs et Pinia"
        ]
    }
];

const workExperiences = [
    {
        type: 'CDD',
        title: 'Préparateur de commande Drive Super-U',
        location: "VERTOU",
        startAt: '2026',
        endAt: '2 mois',
        points: [
            "Préparation des commandes clients à l'aide d’un PDA dans le respect des délais",
            'Sélection, contrôle et conditionnement des produits avant remise au client',
            'Gestion du retrait des commandes et contact avec les clients au point Drive'
        ]
    },
    {
        type: 'Alternance',
        title: 'Développeur Full-Stack',
        location: "L'École de design Nantes Atlantique",
        startAt: '2024',
        endAt: '2025',
        points: [
            'Développement Full-Stack avec Symfony et VueJs',
            'Travail collaboratif avec Git dans un environnement Ubuntu',
            "Développement d'API et gestion des échanges client / serveur"
        ]
    },
    {
        type: 'Service Civique',
        title: 'Ambassadeur du numérique',
        location: "UnisCité Nantes",
        startAt: '2022',
        endAt: '2023',
        points: [
            'Gestion de groupe et prise de parole en public',
            "Organisation d'ateliers et de supports pédagogiques",
            'Adaptation aux différents niveaux de maîtrise du numérique'
        ]
    }
];

const educations = [
    {
        title: "Concepteur Développeur d'Application",
        degree: 'Bac +3',
        location: 'ARINFO, Nantes',
        startAt: '2023',
        endAt: '2024'
    }
];

const skills = [
    "Préparation de commandes",
    "Utilisation d'un PDA",
    "Collecte des produits en rayon",
    "Respect de la chaîne du froid",
    "Accueil et remise des commandes",
    "Relation client",
    "Respect des règles d'hygiène et de sécurité"
];

const softSkills = [
    'Rigueur',
    'Organisation',
    "Esprit d'équipe",
    'Réactivité',
    'Autonomie',
    'Adaptabilité',
];

// Helper
const IconsPDF = ({ icon, color = 'black', size = 12 }: { icon: IconType; color?: string; size?: number; }) => {
    const svg = (icon as any)().props.children;

    if (svg.length < 0) {
        console.error(`${icon.name} is not supported for CV.`);
        return <></>
    }

    return (
        <Svg viewBox={(icon as any)().props.attr.viewBox || '0 0 24 24'} width={size} height={size}>
            {svg.filter((part: any) => part.type === 'path').map(({ props }: any, idx: number) => (
                <Path d={props.d} fill={props.fill === 'none' ? props.fill : color} key={idx} />
            ))}
        </Svg>
    );
}

// Components
const tw = createTw({
    fontSize: {
        xs: 8,
        xsm: 9,
        sm: 10,
        smb: 11,
        base: 12,
        md: 13,
        lg: 14,
        xl: 15,
        '2xl': 16,
        '3xl': 17,
        '4xl': 18,
        '5xl': 19,
        '6xl': 20
    }
});

const Divider = () => {
    return <View style={tw('w-3/4 h-0.5 self-center bg-black my-4')} />
}

const Section = ({ titleSize, title, children }: any) => {
    return (
        <View style={tw('flex gap-1')}>
            <Text style={[tw(`text-${titleSize ?? 'md'} font-semibold uppercase mb-0.5`), { color: '#5288f2' }]}>{title}</Text>
            {children}
        </View>
    );
}

const WorkExperienceItem = ({ type, title, location, startAt, endAt, points }: any) => {
    return (
        <View style={tw('flex gap-2')}>
            <View>
                <Text style={[tw('text-md font-semibold mb-0.5')]}>{title}</Text>
                <View style={[tw('text-sm flex-row gap-1 font-semibold italic')]}>
                    <Text>{startAt} - {endAt}</Text>
                    <Text>• {location}</Text>
                    <Text>• {type}</Text>
                </View>
            </View>
            <View style={[tw('flex gap-1.5 text-sm')]}>
                {points.map((point: string, idx: number) => (
                    <Text key={idx}>• {point}</Text>
                ))}
            </View>
        </View>
    );
}

const ProjectItem = ({ type, title, stack, points }: any) => {
    return (
        <View style={tw('flex gap-2')}>
            <View>
                <Text style={[tw('text-md font-semibold mb-0.5')]}>{title}</Text>
                <View style={[tw('flex-row gap-1 italic font-semibold text-sm')]}>
                    <Text>{type}</Text>
                    <Text style={[tw('flex-row')]}>
                        •
                        {stack.map((stack: string, idx: number) => (
                            <Text key={idx}>
                                {idx > 0 ? ' / ' : ' '}
                                {stack}
                            </Text>
                        ))}
                    </Text>
                </View>
            </View>
            <View style={[tw('flex gap-1.5 text-sm')]}>
                {points.map((point: string, idx: number) => (
                    <Text key={idx}>• {point}</Text>
                ))}
            </View>
        </View>
    );
}

const EducationItem = ({ title, degree, location, startAt, endAt }: any) => {
    return (
        <View>
            <Text style={[tw('text-md font-semibold mb-1')]}>{title}</Text>
            <View style={[tw('flex-row gap-1 italic text-sm mb-1')]}>
                <Text>{degree}</Text>
                <Text>• {location}</Text>
                <Text>• {startAt} - {endAt}</Text>
            </View>
        </View>
    );
}

interface CVProps {
    fullname: string;
    avatarURL?: string;
    phoneNumber?: string | null;
    linkedIn?: Network;
}

const CV = (props: CVProps) => {
    const {
        fullname,
        avatarURL,
        phoneNumber,
        linkedIn
    } = props;

    return (
        <Document>
            <Page size='A4' wrap={false} style={[tw('relative flex text-base'), { height: '100%' }]}>
                <View style={[tw('flex-row')]}>
                    {/* Left Side */}
                    <View style={[tw('flex justify-between p-6 h-full'), { paddingTop: 150, backgroundColor: '#f2f2f2', width: '35%' }]}>
                        <View>
                            <Text style={tw('text-3xl font-semibold self-center')}>Lenny {fullname}</Text>
                            <Divider />
                        </View>


                        {/* Contact */}
                        <Section title='Coordonnées'>
                            <View style={tw('flex gap-2 text-smb')}>
                                {getContactItems({ phoneNumber, linkedIn }).map((item, idx) => (
                                    <View key={idx} style={tw('flex-row items-center gap-2')}>
                                        <IconsPDF icon={item.icon} />

                                        {item.href ? (
                                            <Link style={tw('text-black no-underline')} src={item.href}>{item.value}</Link>
                                        ) : (
                                            <Text>{item.value}</Text>
                                        )}
                                    </View>
                                ))}
                            </View>
                        </Section>

                        {/* Skills */}
                        <Section title='Compétences'>
                            <View style={tw('flex gap-2 text-smb')}>
                                {skills.map((skill, idx) => (
                                    <Text key={idx}>• {skill}</Text>
                                ))}
                            </View>
                        </Section>

                        {/* Soft Skills */}
                        <Section title='Qualités'>
                            <View style={tw('flex gap-2 text-smb')}>
                                {softSkills.map((skill) => (
                                    <Text key={skill}>• {skill}</Text>
                                ))}
                            </View>
                        </Section>

                        {/* Languages */}
                        <Section title='Langues'>
                            <View style={[tw('flex gap-2 text-smb')]}>
                                <Text>• Français - Maternelle</Text>
                                <Text>• Anglais - B1</Text>
                            </View>
                        </Section>

                        {/* Hobbies */}
                        <Section title="Centres d'intérêt">
                            <View style={[tw('flex gap-2 text-smb')]}>
                                <Text>• Gaming</Text>
                                <Text>• Callisthénie</Text>
                                <Text>• Informatique</Text>
                                <Text>• Anime / Manhwa</Text>
                            </View>
                        </Section>
                    </View>

                    {/* Main */}
                    <View style={[tw('flex-1 flex justify-between py-4 px-8'), { paddingTop: 80 }]}>
                        {/* Bio */}
                        <View>
                            <Divider />
                            <Text style={[tw('text-sm font-semibold text-center')]}>
                                Je suis sérieux et motivé, je recherche un emploi pour avoir de l'expérience professionnelle. Je suis aussi organisé et à l'aise dans le travail en équipe, je m'investis pleinement dans les missions qui me sont confiées et j'apprends rapidement.
                            </Text>
                            <Divider />
                        </View>

                        {/* Work Experiences */}
                        <Section titleSize='lg' title='Expériences professionnelles'>
                            <View style={[tw('flex gap-3')]}>
                                {workExperiences.map((data, idx) => (
                                    <WorkExperienceItem key={idx} {...data} />
                                ))}
                            </View>
                        </Section>

                        <Divider />

                        {/* Projects */}
                        <Section titleSize='lg' title='Projets Personnels'>
                            <View style={[tw('flex gap-3')]}>
                                {projects.map((data, idx) => (
                                    <ProjectItem key={idx} {...data} />
                                ))}
                            </View>
                        </Section>

                        <Divider />

                        {/* Educations */}
                        <Section titleSize='lg' title='Diplômes'>
                            <View style={[tw('flex gap-3')]}>
                                {educations.map((data, idx) => (
                                    <EducationItem key={idx} {...data} />
                                ))}
                            </View>
                        </Section>
                    </View>
                </View>

                {/* Decor */}
                <View style={{
                    position: 'absolute',
                    top: -70,
                    right: -20,
                    width: 600,
                    height: 120,
                    backgroundColor: '#002060',
                    transform: 'rotate(8deg)',
                }} />

                <View style={{
                    position: 'absolute',
                    top: -50,
                    left: -100,
                    width: 300,
                    height: 150,
                    backgroundColor: '#c494ec',
                    transform: 'rotate(-35deg)',
                }} />

                {avatarURL && (
                    <Image
                        src={avatarURL}
                        style={{
                            position: 'absolute',
                            top: 15,
                            left: 38.5,
                            width: 128,
                            height: 128,
                            borderRadius: 128
                        }}
                    />
                )}
            </Page>
        </Document>
    );
}

export default CV;
