import { Document, Link, Text, Page, Path, View, Svg, Image } from '@react-pdf/renderer'
import { createTw } from 'react-pdf-tailwind'

import { MdEmail, MdMap } from 'react-icons/md'
import { GrGithub, GrLinkedin } from 'react-icons/gr'
import { FaCar, FaPhoneAlt } from 'react-icons/fa'

import userInfo from '@/data/userInfo'

const IconsPDF = ({ icon, color = 'black', size = 14 }) => {
    const svg = icon().props.children;

    if (svg.length < 0) {
        return console.error(`${icon.name} is not supported for CV.`);
    }

    return (
        <Svg viewBox={icon().props.attr.viewBox || '0 0 24 24'} width={size} height={size}>
            {svg.filter((part) => part.type === 'path').map(({ props }, idx) => (
                <Path d={props.d} fill={props.fill === 'none' ? props.fill : color} key={idx} />
            ))}
        </Svg>
    );
}

const CV = (props) => {
    const {
        fullname,
        avatarURL,
        phoneNumber
    } = props;

    const tw = createTw({
        fontSize: {
            xs: 10,
            xsm: 11,
            sm: 12,
            smb: 13,
            base: 14,
            md: 15,
            lg: 16,
            xl: 20,
        },
    });

    const linkedIn = userInfo.network.find((network) => network.name === 'LinkedIn');

    return (
        <Document>
            <Page size='A4' wrap={false} style={[tw('relative'), { flexDirection: 'column', height: '100%' }]}>
                <View style={[tw('flex-row')]}>
                    {/* Left Side */}
                    <View style={[tw('p-6 h-full'), { paddingTop: 150, backgroundColor: '#f2f2f2', width: '35%' }]}>
                        <Text style={[tw('text-xl')]}>Lenny {fullname}</Text>
                        <View style={[tw('w-full h-0.5 bg-black mt-2 mb-2')]} />
                        {/* Contact */}
                        <View style={[tw('flex gap-1')]}>
                            <Text style={[tw('text-md uppercase font-semibold mb-1'), { color: '#5288f2' }]}>Coordonnées</Text>
                            {phoneNumber && (
                                <View style={[tw('flex-row items-center gap-2 text-xsm')]}>
                                    <IconsPDF icon={FaPhoneAlt} />
                                    <Link style={tw('text-black no-underline')} src={`tel:${phoneNumber}`}>{phoneNumber.replace(/(\d{2})(?=\d)/g, '$1 ')}</Link>
                                </View>
                            )}
                            <View style={[tw('flex-row items-center gap-2 text-xsm')]}>
                                <IconsPDF icon={MdEmail} />
                                <Link style={tw('text-black no-underline')} src={`mailto:${userInfo.email}`}>{userInfo.email}</Link>
                            </View>
                            <View style={[tw('flex-row items-center gap-2 text-xsm')]}>
                                <IconsPDF icon={MdMap} />
                                <Text>{userInfo.localisation}</Text>
                            </View>
                            <View style={[tw('flex-row items-center gap-2 text-xsm')]}>
                                <IconsPDF icon={GrGithub} />
                                <Link style={tw('text-black no-underline')} src={`https://github.com/shuurei`}>github.com/shuurei</Link>
                            </View>
                            {linkedIn && (
                                <View style={[tw('flex-row items-center gap-2 text-xsm')]}>
                                    <IconsPDF icon={GrLinkedin} />
                                    <Link style={tw('text-black no-underline')} src={linkedIn.link}>linkedin.com/in/{linkedIn.username}</Link>
                                </View>
                            )}
                            <View style={[tw('flex-row items-center gap-2 text-xsm')]}>
                                <IconsPDF icon={FaCar} />
                                <Text>Permis B en cours</Text>
                            </View>
                        </View>
                        <View style={[tw('w-full h-0.5 bg-black mb-2 mt-2')]} />
                        {/* Skills */}
                        <View style={[tw('flex gap-1')]}>
                            <Text style={[tw('text-md uppercase font-semibold'), { color: '#5288f2' }]}>Compétences</Text>
                            <View>
                                <Text style={[tw('text-sm uppercase font-semibold mb-0.5'), { color: '#8499c4' }]}>langages</Text>
                                <View style={[tw('flex gap-1 text-xsm')]}>
                                    <Text>• TypeScript (Avancé)</Text>
                                    <Text>• JavaScript (Avancé)</Text>
                                    <Text>• Python (Bases)</Text>
                                    <Text>• JAVA (Bases)</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={[tw('text-sm uppercase font-semibold mb-0.5'), { color: '#8499c4' }]}>Bibliothèques</Text>
                                <View style={[tw('text-xsm flex gap-1')]}>
                                    <Text>• React (Avancé)</Text>
                                    <Text>• React-Native (Avancé)</Text>
                                    <Text>• Tailwind (Avancé)</Text>
                                    <Text>• VueJs (Intermédiaire)</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={[tw('text-sm uppercase font-semibold mb-0.5'), { color: '#8499c4' }]}>Techniques</Text>
                                <View style={[tw('text-xsm flex gap-1')]}>
                                    <Text>• API REST (Avancé)</Text>
                                    <Text>• Linux (Intermédiaire)</Text>
                                    <Text>• Docker (Bases)</Text>
                                    <Text>• CI/CD (Bases)</Text>
                                    <Text>• Git / Github (Bases)</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={[tw('text-sm uppercase font-semibold mb-0.5'), { color: '#8499c4' }]}>professionnelles</Text>
                                <View style={[tw('text-xsm flex gap-1')]}>
                                    <Text>• Autonome</Text>
                                    <Text>• Curieux</Text>
                                    <Text>• Rigoureux</Text>
                                    <Text>• Persévérant</Text>
                                    <Text>• Analytique</Text>
                                    <Text>• Adaptable</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[tw('w-full h-0.5 bg-black mb-2 mt-2')]} />
                        {/* Languages */}
                        <View style={[tw('flex gap-1')]}>
                            <Text style={[tw('text-md uppercase font-semibold'), { color: '#5288f2' }]}>Langues</Text>
                            <View style={[tw('text-sm flex gap-1')]}>
                                <Text>• Français - Maternelle</Text>
                                <Text>• Anglais - B1</Text>
                            </View>
                        </View>
                        <View style={[tw('w-full h-0.5 bg-black mb-2 mt-2')]} />
                        {/* Hobbies */}
                        <View style={[tw('flex gap-1')]}>
                            <Text style={[tw('text-md uppercase font-semibold'), { color: '#5288f2' }]}>Centres d'intérêt</Text>
                            <View style={[tw('text-sm flex gap-1')]}>
                                <Text>• Gaming</Text>
                                <Text>• Callisthénie</Text>
                                <Text>• Anime / Manhwa</Text>
                            </View>
                        </View>
                    </View>

                    {/* Right Side */}
                    <View style={[tw('flex-1 p-8'), { paddingTop: 120 }]}>
                        <Image
                            style={{
                                alignSelf: 'flex-start',
                                height: 40,
                                objectFit: 'contain',
                            }}
                            src={`${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/supdevinciLogo.png`}
                        />
                        {/* Bio */}
                        <View style={[tw('w-full h-0.5 bg-black mb-2 mt-2')]} />
                        <Text style={[tw('text-sm')]}>Titulaire du diplôme de Concepteur Développeur d’Applications. J'ai acquis plusieurs mois d’expérience en alternance. Passionné par le développement web et logiciel, je recherche une alternance à partir de juillet 2026.</Text>
                        <View style={[tw('w-full h-0.5 bg-black mb-2 mt-2')]} />
                        {/* Pro */}
                        <Text style={[tw('text-md uppercase font-semibold mb-1'), { color: '#5288f2' }]}>Expériences professionnelles</Text>
                        <View style={[tw('flex gap-2')]}>
                            <View>
                                <Text style={[tw('text-smb font-semibold')]}>Développeur Full-Stack</Text>
                                <View style={[tw('flex-row gap-1 text-xsm mb-1')]}>
                                    <Text style={[tw('italic')]}>Alternance - L'École de design Nantes Atlantique</Text>
                                    <Text style={[tw('text-gray-500')]}>| 2024 - 2025</Text>
                                </View>
                                <View style={[tw('flex gap-1 text-sm')]}>
                                    <Text>• Développement Full-Stack avec Symfony et VueJs</Text>
                                    <Text>• Conception et intégration de nouvelles fonctionnalités</Text>
                                    <Text>• Travail collaboratif avec Git dans un environnement Ubuntu</Text>
                                    <Text>• Développement d'API et gestion des échanges client / serveur</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={[tw('text-smb font-semibold')]}>Ambassadeur du numérique</Text>
                                <View style={[tw('flex-row gap-1 text-xsm mb-1')]}>
                                    <Text style={[tw('italic')]}>Service Civique - UnisCité Nantes</Text>
                                    <Text style={[tw('text-gray-500')]}>| 2022 - 2023</Text>
                                </View>
                                <View style={[tw('flex gap-1 text-sm')]}>
                                    <Text>• Gestion de groupe et prise de parole en public</Text>
                                    <Text>• Organisation d'ateliers et de supports pédagogiques</Text>
                                    <Text>• Adaptation aux différents niveaux de maîtrise du numérique</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[tw('w-full h-0.5 bg-black mb-2 mt-2')]} />
                        {/* Projects */}
                        <Text style={[tw('text-md uppercase font-semibold mb-1'), { color: '#5288f2' }]}>Projets Personnels</Text>
                        <View style={[tw('flex gap-2')]}>
                            <View>
                                <Text style={[tw('text-smb font-semibold mb-1')]}>Erelya</Text>
                                <View style={[tw('flex-row gap-1 text-xsm mb-1')]}>
                                    <Text>Bot Discord |</Text>
                                    <Text style={[tw('font-semibold italic')]}>TypeScript / Prisma / NodeJs / MySQL</Text>
                                </View>
                                <View style={[tw('flex gap-1 text-sm')]}>
                                    <Text>• Déploiement du projet avec Docker</Text>
                                    <Text>• Conception d'un bot Discord modulaire et Open-Source</Text>
                                    <Text>• Mise en place d'une base de données avec Prisma et MySQL</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={[tw('text-smb font-semibold mb-1')]}>Minim'Ow Bar</Text>
                                <View style={[tw('flex-row gap-1 text-xsm mb-1')]}>
                                    <Text>Site Fictif |</Text>
                                    <Text style={[tw('font-semibold italic')]}>TypeScript / React / Tailwind</Text>
                                </View>
                                <View style={[tw('flex gap-1 text-sm')]}>
                                    <Text>• Conception d'un site vitrine fictif pour un bar à chats</Text>
                                    <Text>• Création d'une interface moderne et responsive avec React</Text>
                                    <Text>• Développement de pages dédiées au menu, aux réservations et aux chats</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={[tw('text-smb font-semibold mb-1')]}>Lara Weeb</Text>
                                <View style={[tw('flex-row gap-1 text-xsm mb-1')]}>
                                    <Text>Réseau Social |</Text>
                                    <Text style={[tw('font-semibold italic')]}>Laravel / VueJs / Pinia / MySQL</Text>
                                </View>
                                <View style={[tw('flex gap-1 text-sm')]}>
                                    <Text>• Gestion des utilisateurs, publications et interactions</Text>
                                    <Text>• Conception d'un réseau social autour de la culture manga</Text>
                                    <Text>• Développement d'une interface dynamique avec VueJs et Pinia</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[tw('w-full h-0.5 bg-black mb-2 mt-2')]} />
                        {/* Diplomes */}
                        <Text style={[tw('text-md uppercase font-semibold mb-1'), { color: '#5288f2' }]}>Diplôme</Text>
                        <View>
                            <Text style={[tw('text-smb font-semibold mb-0.5')]}>Mastère Développement Full-Stack</Text>
                            <View style={[tw('flex-row gap-1 text-xsm mb-1')]}>
                                <Text>Bac +5 - Sup De Vinci, Nantes</Text>
                                <Text style={[tw('text-gray-500')]}>| À partir d'Octobre 2026 - 2028</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={[tw('text-smb font-semibold mb-0.5')]}>Concepteur Développeur d'Application</Text>
                            <View style={[tw('flex-row gap-1 text-xsm mb-1')]}>
                                <Text>Bac +3 - ARINFO, Nantes</Text>
                                <Text style={[tw('text-gray-500')]}>| 2023 - 2024</Text>
                            </View>
                        </View>
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
                            left: 20,
                            width: 128,
                            height: 128,
                        }}
                    />
                )}

                {/* Title */}
                <View style={[tw('absolute top-8 right-6 bottom-0 flex uppercase')]}>
                    <Text style={[tw('text-white font-bold')]}>
                        Mastère Développeur Full-Stack
                    </Text>
                    <Text style={[tw('text-white font-bold self-end')]}>
                        En alternance
                    </Text>
                    <Text style={[tw('text-xs text-white font-bold text-right self-end mt-0.5'), { color: '#eed9ff' }]}>
                        3 semaines entreprise / 1 semaine école
                    </Text>
                </View>
            </Page>
        </Document>
    );
}

export default CV;
