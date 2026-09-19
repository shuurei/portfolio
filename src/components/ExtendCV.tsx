import { Document, Link, Text, Page, Path, View, Svg, Image } from '@react-pdf/renderer'
import { createTw } from 'react-pdf-tailwind'

import { MdEmail, MdMap } from 'react-icons/md'
import { GrGithub, GrLinkedin } from 'react-icons/gr'
import { FaCar, FaCode, FaPhoneAlt } from 'react-icons/fa'
import { me, type Network } from '@/data/me'
import type { IconType } from 'react-icons'
import type { Project } from '@/contexts/ProjectsContext'
import { formatProjectName } from '@/utils/string'

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

const workExperiences = [
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
        title: 'Mastère Développement Full-Stack',
        degree: 'Bac +5',
        location: 'Sup De Vinci, Nantes',
        startAt: "À partir d'Octobre 2026",
        endAt: '2028'
    },
    {
        title: "Concepteur Développeur d'Application",
        degree: 'Bac +3',
        location: 'ARINFO, Nantes',
        startAt: '2023',
        endAt: '2024'
    }
];

const skills = [
    'JavaScript',
    'TypeScript',
    'React',
    'React-Native',
    'VueJs',
    'Tailwind',
    'Linux',
    'JAVA',
    'Python',
    'Docker',
    'CI/CD',
    'Git / Github',
];

const softSkills = [
    'Autonome',
    'Rigoureux',
    'Analytique',
    'Curieux'
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
        <View style={tw('flex gap-2')}>
            <Text style={[tw(`text-${titleSize ?? 'md'} font-semibold uppercase mb-0.5`), { color: '#5288f2' }]}>{title}</Text>
            {children}
        </View>
    );
}

const WorkExperienceItem = ({ type, title, location, startAt, endAt, points }: any) => {
    return (
        <View style={[tw('flex gap-2 border px-5 py-3 rounded-xl'), { borderColor: '#d9d9d9', backgroundColor: '#fafafa' }]}>
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

const ProjectItem = ({ name, technos, highlights }: Project) => {
    return (
        <View style={[tw('flex gap-2 border px-5 py-3 rounded-xl'), { borderColor: '#d9d9d9', backgroundColor: '#fafafa' }]}>
            <View style={tw('flex-row items-center justify-between')}>
                <Text style={[tw('text-md font-semibold mb-0.5')]}>{name}</Text>
                <View style={[tw('flex-row gap-1 italic font-semibold text-sm')]}>
                    {technos && technos?.length > 0 && (<Text style={[tw('flex-row')]}>
                        {technos.map((stack: string, idx: number) => (
                            <Text key={idx}>
                                {idx > 0 ? ' / ' : ' '}
                                {stack}
                            </Text>
                        ))}
                    </Text>)}
                </View>
            </View>
            {highlights && highlights.length > 0 && (<View style={[tw('flex gap-1.5 text-sm')]}>
                {highlights.map((point: string, idx: number) => (
                    <Text key={idx}>• {point}</Text>
                ))}
            </View>)}
        </View>
    );
}

const EducationItem = ({ title, degree, location, startAt, endAt }: any) => {
    return (
        <View style={[tw('flex gap-1 border px-5 py-3 rounded-xl'), { borderColor: '#d9d9d9', backgroundColor: '#fafafa' }]}>
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
    github?: Network;
    linkedIn?: Network;
    projects: Project[];
}

const ExtendCV = (props: CVProps) => {
    const { fullname, avatarURL, phoneNumber, github, linkedIn, projects } = props;
    const projectsPerPage = 5;

    const sortedProjects = projects
        .filter((project) => project.highlights?.some((highlight) => highlight.trim().length > 0) && project.language?.toLowerCase() !== 'json' && !project.name.includes('kaizen'))
        .sort((a, b) => {
            const getScore = (project: Project) => {
                const descriptionLength = project.highlights?.reduce((total, highlight) => total + highlight.trim().length, 0) ?? 0;
                const technosCount = project.technos?.length ?? 0;
                const hasLanguage = project.language ? 1 : 0;
                const topics = (project as Project & { topics?: string[] }).topics?.length ?? 0;

                const getUpdateBonus = (updatedAt?: string) => {
                    if (!updatedAt) return 0;

                    const daysSinceUpdate = (Date.now() - new Date(updatedAt).getTime()) / (1000 * 60 * 60 * 24);

                    if (daysSinceUpdate <= 30) return 120;
                    if (daysSinceUpdate <= 90) return 60;
                    if (daysSinceUpdate <= 180) return 45;
                    if (daysSinceUpdate <= 365) return 15;

                    return 0;
                };

                const updateBonus = getUpdateBonus(project.updatedAt);

                return (descriptionLength * 10) + (technosCount * 16) + topics + (hasLanguage * 8) + (updateBonus * 12);
            };

            return getScore(b) - getScore(a);
        });

    const featuredProject = sortedProjects[0];
    const allProjects = sortedProjects.slice(1);

    const projectPages = Array.from(
        { length: Math.ceil(allProjects.length / projectsPerPage) },
        (_, pageIndex) => allProjects.slice(
            pageIndex * projectsPerPage,
            (pageIndex + 1) * projectsPerPage
        )
    );

    return (
        <Document>
            <Page size='A4' wrap={false} style={[tw('relative flex text-base')]}>
                <View style={[tw('flex-row h-full')]}>
                    {/* Left Side */}
                    <View style={[tw('flex justify-between p-6 h-full'), { paddingTop: 150, backgroundColor: '#f2f2f2', width: '30%' }]}>
                        <View>
                            <Text style={tw('text-3xl font-semibold self-center')}>Lenny {fullname}</Text>
                            <Divider />
                        </View>

                        {/* Contact */}
                        <Section title='Coordonnées'>
                            <View style={tw('flex gap-2 text-smb')}>
                                {getContactItems({ phoneNumber, github, linkedIn }).map((item, idx) => (
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
                                <Text>• Anime / Manhwa</Text>
                            </View>
                        </Section>
                    </View>

                    {/* Main */}
                    <View style={[tw('flex-1 gap-5 flex py-4 px-8'), { paddingTop: 120 }]}>
                        {/* Bio */}
                        <View>
                            <Image
                                style={{ height: 36, alignSelf: 'flex-start', objectFit: 'contain' }}
                                src='/portfolio/supdevinciLogo.png'
                            />
                            <Divider />
                            <Text style={[tw('text-sm font-semibold text-center')]}>
                                Titulaire du diplôme de Concepteur Développeur d'Application, je souhaite me spécialiser en développent mes compétences autant bien dans le front que dans le back.
                                Je recherche une alternance à partir de juillet 2026.
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

                        {/* Educations */}
                        <Section titleSize='lg' title='Diplômes'>
                            <View style={[tw('flex gap-3')]}>
                                {educations.map((data, idx) => (
                                    <EducationItem key={idx} {...data} />
                                ))}
                            </View>
                        </Section>

                        {/* Featured Project */}
                        <Section titleSize='lg' title='Projet mis en avant'>
                            <View style={[tw('flex gap-3')]}>
                                <ProjectItem {...featuredProject} />
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
                    height: 175,
                    backgroundColor: '#002060',
                    transform: 'rotate(10deg)',
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
                            left: 25,
                            width: 128,
                            height: 128,
                            borderRadius: 128
                        }}
                    />
                )}

                {/* Title */}
                <View style={tw('flex absolute top-8 right-6 bottom-0 text-white font-bold uppercase')}>
                    <View style={tw('flex text-6xl mb-1')}>
                        <Text>Développeur Full-Stack</Text>
                        <Text style={tw('self-end')}>En alternance</Text>
                    </View>
                    <Text style={[tw('text-sm self-end'), { color: '#eed9ff' }]}>
                        3 semaines entreprise / 1 semaine école
                    </Text>
                    <Text style={[tw('text-sm self-end'), { color: '#eed9ff' }]}>
                        D'octobre 2026 jusqu'en octobre 2028
                    </Text>
                </View>
            </Page>

            {projectPages.map((pageProjects, pageIndex) => (
                <Page key={`projects-${pageIndex}`} size='A4' wrap style={[tw('relative'), { padding: 50, paddingTop: 70 }]}>
                    <Text style={tw('text-3xl font-semibold')}>Mes projets</Text>

                    <View style={tw('flex gap-3 mt-3')}>
                        {pageProjects.map((project, idx) => (
                            <View
                                key={`${project.name}-${pageIndex}-${idx}`}
                                wrap={false}
                                style={[tw('border p-5 rounded-xl'), { borderColor: '#d9d9d9', backgroundColor: '#fafafa' }]}
                            >
                                <View style={tw('flex-row justify-between items-start')}>
                                    <View>
                                        <Text style={tw('text-lg font-semibold mb-1')}>{formatProjectName(project.name)}</Text>
                                    </View>

                                    {((project.technos && project.technos.length > 0) || project.language) && (<View style={{ alignItems: 'flex-end' }}>
                                        <Text style={[tw('text-sm font-semibold text-right')]}>
                                            {[project.language, ...(project.technos ?? []).filter((tech) => tech.toUpperCase() !== project.language?.toUpperCase())].filter(Boolean).join(' / ')}
                                        </Text>
                                    </View>)}
                                </View>

                                {project.highlights && project.highlights.length > 0 && (<View style={tw('flex gap-1.5 mt-3')}>
                                    {project.highlights.map((point, idx) => (
                                        <Text key={idx} style={tw('text-sm')}>• {point}</Text>
                                    ))}
                                </View>)}
                            </View>
                        ))}
                    </View>

                    <View fixed style={[tw('absolute flex-row justify-between items-center'), { left: 42, right: 42, bottom: 25, borderTopWidth: 1, borderTopColor: '#e5e5e5', paddingTop: 6 }]}>
                        <Text style={tw('text-xl font-semibold')}>Lenny {fullname}</Text>
                        <Text style={tw('text-xs')}>Page {pageIndex + 2} / {projectPages.length + 1}</Text>
                    </View>

                    <View style={{
                        position: 'absolute',
                        top: -160,
                        right: -20,
                        width: 600,
                        height: 175,
                        backgroundColor: '#002060',
                        transform: 'rotate(8deg)',
                    }} />

                    <View style={{
                        position: 'absolute',
                        top: -120,
                        left: -100,
                        width: 600,
                        height: 150,
                        backgroundColor: '#c494ec',
                        transform: 'rotate(-9deg)',
                    }} />
                </Page>
            ))}
        </Document>
    );
}

export default ExtendCV;
