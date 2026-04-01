import { Document, Link, Text, Page, Path, View, Svg, Rect, Defs, LinearGradient, Stop, Font, Image } from '@react-pdf/renderer'
import { createTw } from 'react-pdf-tailwind'

import { MdEmail, MdMap } from 'react-icons/md'
import { GrLinkedin } from 'react-icons/gr'
import { BsFillBuildingFill } from 'react-icons/bs'
import { FaGraduationCap, FaPhoneAlt } from 'react-icons/fa'

import userInfo from '@/data/userInfo'
import userSkills from '@/data/userSkills'

Font.register({
    family: 'Iceland',
    src: 'https://fonts.gstatic.com/s/iceland/v20/rax9HiuFsdMNOnWPWKw.ttf'
});

Font.register({
    family: 'BigShouldersDisplay',
    fonts: [
        {
            src: 'https://fonts.gstatic.com/s/bigshouldersdisplay/v21/fC1MPZJEZG-e9gHhdI4-NBbfd2ys3SjJCx12wPgf9g-_3F0YdY86JF4.ttf',
            fontWeight: 100
        },
        {
            src: 'https://fonts.gstatic.com/s/bigshouldersdisplay/v21/fC1MPZJEZG-e9gHhdI4-NBbfd2ys3SjJCx12wPgf9g-_3F0YdQ87JF4.ttf',
            fontWeight: 200
        },
        {
            src: 'https://fonts.gstatic.com/s/bigshouldersdisplay/v21/fC1MPZJEZG-e9gHhdI4-NBbfd2ys3SjJCx12wPgf9g-_3F0YddE7JF4.ttf',
            fontWeight: 300
        },
        {
            src: 'https://fonts.gstatic.com/s/bigshouldersdisplay/v21/fC1MPZJEZG-e9gHhdI4-NBbfd2ys3SjJCx12wPgf9g-_3F0YdY87JF4.ttf',
            fontWeight: 400
        },
        {
            src: 'https://fonts.gstatic.com/s/bigshouldersdisplay/v21/fC1MPZJEZG-e9gHhdI4-NBbfd2ys3SjJCx12wPgf9g-_3F0Ydb07JF4.ttf',
            fontWeight: 500
        },
        {
            src: 'https://fonts.gstatic.com/s/bigshouldersdisplay/v21/fC1MPZJEZG-e9gHhdI4-NBbfd2ys3SjJCx12wPgf9g-_3F0YdVE8JF4.ttf',
            fontWeight: 600
        },
        {
            src: 'https://fonts.gstatic.com/s/bigshouldersdisplay/v21/fC1MPZJEZG-e9gHhdI4-NBbfd2ys3SjJCx12wPgf9g-_3F0YdWg8JF4.ttf',
            fontWeight: 700
        },
        {
            src: 'https://fonts.gstatic.com/s/bigshouldersdisplay/v21/fC1MPZJEZG-e9gHhdI4-NBbfd2ys3SjJCx12wPgf9g-_3F0YdQ88JF4.ttf',
            fontWeight: 800
        },
        {
            src: 'https://fonts.gstatic.com/s/bigshouldersdisplay/v21/fC1MPZJEZG-e9gHhdI4-NBbfd2ys3SjJCx12wPgf9g-_3F0YdSY8JF4.ttf',
            fontWeight: 900
        }
    ]
});

const pdfColors = {
    dark: {
        canvas: '#000000',
        card: '#101010',
        neutral: '#303030',
        base: '#FFFFFF',
    },
    light: {
        canvas: '#FFFFFF',
        card: '#ffffff80',
        neutral: '#D5D5D5',
        base: '#000000',
    }
};

const IconsPDF = ({ icon, color = 'white', size = 24 }) => {
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
        skills,
        projects,
        accentColor,
        seasonName,
        mode,
        themeId,
        themeType,
        showAvatarCV = true,
        avatarURL,
        phoneNumber
    } = props;

    const colors = pdfColors[mode];

    const tw = createTw({
        fontFamily: {
            iceland: ['Iceland'],
            bigShouldersDisplay: ['BigShouldersDisplay'],
        },
        colors: {
            canvas: colors.canvas,
            card: colors.card,
            neutral: colors.neutral,
            base: colors.base,
            accent: accentColor,
        },
        fontSize: {
            xs: 10,
            sm: 12,
            base: 14,
            lg: 16,
            xl: 20,
        },
    });

    const skillsNeeded = skills.filter((skill) => skill.isNeeded);

    return (
        <Document>
            <Page size='A4' wrap={false} style={[tw('relative bg-canvas'), { flexDirection: 'column', height: '100%' }]}>
                <View style={[tw('p-4'), { flex: 1, height: 841.89, justifyContent: 'space-between' }]}>
                    {/* Background Gradient */}
                    <View style={[tw('absolute top-0 left-0 right-0 bottom-0')]}>
                        <Svg style={tw('absolute')} width='100%' height='100%' viewBox='0 0 595.28 841.89'>
                            <Defs>
                                <LinearGradient id='gradient' x1='0' y1='1' x2='1' y2='0'>
                                    <Stop offset='0%' stopColor={accentColor} stopOpacity={0.3} />
                                    <Stop offset='30%' stopColor='#000' stopOpacity={0} />
                                    <Stop offset='70%' stopColor='#000' stopOpacity={0} />
                                    <Stop offset='100%' stopColor={accentColor} stopOpacity={0.3} />
                                </LinearGradient>
                            </Defs>

                            <Rect x='0' y='0' width='100%' height='100%' fill='url(#gradient)' />
                        </Svg>
                    </View>
                    <View>
                        {/* Content */}
                        <View style={tw('flex gap-4')}>
                            <View style={tw('flex gap-4 flex-row')}>
                                <View style={[tw('flex gap-3'), { width: 250 }]}>
                                    {/* Avatar */}
                                    {
                                        showAvatarCV && (<View style={[tw('relative p-2 border-2 border-neutral')]}>
                                            <View style={tw('absolute top-0 left-0 w-full h-full')}>
                                                <View style={[tw('border-t-4 border-l-4 absolute h-8 w-8 border-accent'), { top: -3, left: -3 }]}></View>
                                                <View style={[tw('border-t-4 border-r-4 absolute h-8 w-8 border-accent'), { top: -3, right: -3 }]}></View>
                                                <View style={[tw('border-b-4 border-l-4 absolute h-8 w-8 border-accent'), { bottom: -3, left: -3 }]}></View>
                                                <View style={[tw('border-b-4 border-r-4 absolute h-8 w-8 border-accent'), { bottom: -3, right: -3 }]}></View>
                                            </View>
                                            <Image src={avatarURL ?? userInfo.avatarPath(themeId)} />
                                        </View>)
                                    }

                                    {/* Contact */}
                                    <View style={[tw('flex gap-2 font-iceland'), { fontSize: 14 }]}>
                                        <View style={tw('flex flex-row gap-2 items-center text-base')}>
                                            <IconsPDF icon={GrLinkedin} size={20} color={accentColor} />
                                            <Link style={tw('no-underline text-base')} src={`${userInfo.network.find((network) => network.name === 'LinkedIn').link}`}>Lenny LQS</Link>
                                        </View>
                                        <View style={tw('flex flex-row gap-2 items-center text-base')}>
                                            <IconsPDF icon={MdEmail} size={20} color={accentColor} />
                                            <Link style={tw('no-underline text-base')} src={`mailto:${userInfo.email}`}>{userInfo.email}</Link>
                                        </View>
                                        <View style={tw('flex flex-row gap-2 items-center text-base')}>
                                            <IconsPDF icon={MdMap} size={20} color={accentColor} />
                                            <Text>{userInfo.localisation}</Text>
                                        </View>
                                        { phoneNumber && (
                                            <View style={tw('flex flex-row gap-2 items-center text-base')}>
                                                <IconsPDF icon={FaPhoneAlt} size={18} color={accentColor} />
                                                <Link style={tw('no-underline text-base')} src={`tel:${phoneNumber}`}>{phoneNumber.replace(/(\d{2})(?=\d)/g, '$1 ')}</Link>
                                            </View>
                                        )}
                                    </View>
                                </View>

                                {/* Skills */}
                                <View style={tw('flex w-full gap-2')}>
                                    <Text style={tw('flex justify-between bg-accent text-black font-bold font-bigShouldersDisplay px-3 py-1 uppercase')}>Mes Compétences {skillsNeeded.length ? ` | ${skillsNeeded.length} qui suscitent votre intérêt` : ''}</Text>
                                    <View style={[tw('p-2 py-4 border-2 border-neutral')]}>
                                        <View style={tw('flex flex-wrap flex-row gap-4')}>
                                            {skills.map(({ name, icon, isNeeded }, idx) => (
                                                <View style={[tw('flex items-center gap-2'), { width: 65 }]} key={idx}>
                                                    <IconsPDF icon={icon} color={isNeeded ? '#05df72' : accentColor} />
                                                    <Text style={[tw('font-iceland text-base text-center'), { fontSize: 14 }]}>{name}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    </View>
                                </View>
                            </View>
                            {/* About myself */}
                            <View style={[tw('relative p-4 border-2 border-neutral')]}>
                                <View style={tw('absolute top-0 left-0 w-full h-full')}>
                                    <View style={[tw('border-t-4 border-l-4 absolute h-8 w-8 border-accent'), { top: -3, left: -3 }]}></View>
                                    <View style={[tw('border-t-4 border-r-4 absolute h-8 w-8 border-accent'), { top: -3, right: -3 }]}></View>
                                    <View style={[tw('border-b-4 border-l-4 absolute h-8 w-8 border-accent'), { bottom: -3, left: -3 }]}></View>
                                    <View style={[tw('border-b-4 border-r-4 absolute h-8 w-8 border-accent'), { bottom: -3, right: -3 }]}></View>
                                </View>
                                <Text style={[tw('font-iceland text-base'), { fontSize: 14 }]}>Je m'appelle Lenny, j'ai {userInfo.old} ans. Je recherche un poste dans le développement Full-Stack / Mobile. Je poursuis activement le développement de mes compétences en web, mobile et game dev, en travaillant régulièrement sur des projets personnels qui me permettent d’apprendre de nouvelles techniques et de progresser à mon rythme. Chaque projet m’aide à gagner en expérience et à me rapprocher de mes objectifs.</Text>
                            </View>
                            {/* Projects */}
                            <View style={tw('flex flex-row gap-4')}>
                                <View style={tw('flex-1 flex gap-2')}>
                                    <Text style={tw('flex justify-between bg-accent text-black font-bold font-bigShouldersDisplay px-3 py-1 uppercase')}>Mes derniers projets personnels</Text>
                                    <View style={tw('flex gap-2')}>
                                        {projects.slice(0, 3).map(({ name, description, language }, idx) => (
                                            <View style={[tw('flex p-3 gap-6 bg-card border-2 text-base border-accent')]} key={idx}>
                                                <View style={tw('flex gap-6')}>
                                                    <Text style={[tw('font-bigShouldersDisplay font-bold text-accent mb-2'), { flex: 1, fontSize: 15 }]}>// {name.replaceAll('-', ' ').toUpperCase()}</Text>
                                                    <Text style={[tw('font-iceland font-bold text-accent'), { flex: 1, color: '#AAAAAA', fontSize: 13 }]}>{language}</Text>
                                                </View>
                                                <Text style={[tw('font-iceland'), { fontSize: 12 }]}>{description}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                                {/* Experience and Diplomas */}
                                <View style={tw('flex-1 flex gap-2')}>
                                    <Text style={tw('flex justify-between bg-accent text-black font-bold font-bigShouldersDisplay px-3 py-1 uppercase')}>Mes dernières expériences</Text>
                                    <View style={tw('flex gap-2')}>
                                        {/* TODO : ADUJST CV OR JUST REWORK IT */}
                                        {userInfo.experiences.slice(0, 1).map(({ title, description, startAt, endAt }, idx) => (
                                            <View style={[tw('flex p-3 gap-2 bg-card border-2 text-base border-accent')]} key={idx}>
                                                <View style={tw('flex flex-row gap-2 w-full')}>
                                                    <IconsPDF icon={BsFillBuildingFill} size={20} color={accentColor} />
                                                    <Text style={[tw('font-bigShouldersDisplay font-bold text-accent'), { flex: 1, fontSize: 15 }]}>{title}</Text>
                                                </View>
                                                <View style={[tw('flex flex-row gap-0 font-iceland'), { fontSize: 12, color: '#AAAAAA' }]}>
                                                    <Text>{new Date(startAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short' })} - </Text>
                                                    <Text>{endAt ? new Date(endAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short' }) : 'Maitenant'}</Text>
                                                </View>
                                                <Text style={[tw('font-iceland'), { fontSize: 12 }]}>{description}</Text>
                                            </View>
                                        ))}
                                    </View>
                                    <Text style={tw('flex justify-between bg-accent text-black font-bold font-bigShouldersDisplay px-3 py-1 uppercase')}>Mes derniers diplômes</Text>
                                    <View style={tw('flex gap-2')}>
                                        {userInfo.diplomas.map(({ title, description, startAt, degrees, endAt, school }, idx) => (
                                            <View style={[tw('flex p-3 gap-2 bg-card border-2 text-base border-accent')]} key={idx}>
                                                <View style={tw('flex gap-3')}>
                                                    <View style={tw('flex flex-row gap-2 w-full')}>
                                                        <IconsPDF icon={FaGraduationCap} size={20} color={accentColor} />
                                                        <Text style={[tw('font-bigShouldersDisplay font-bold text-accent'), { flex: 1, fontSize: 15 }]}>{title}</Text>
                                                    </View>
                                                    <View style={tw('flex flex-row gap-1')}>
                                                        {school && <Text style={[tw('font-iceland text-accent'), { color: '#AAAAAA', fontSize: 12 }]}>À {school}</Text>}
                                                        {startAt && (
                                                            <View style={[tw('flex flex-row gap-0 font-iceland'), { fontSize: 12, color: '#AAAAAA' }]}>
                                                                <Text>{new Date(startAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short' })} - </Text>
                                                                <Text>{new Date(endAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short' })}</Text>
                                                            </View>
                                                        )}
                                                    </View>
                                                </View>
                                                <div style={tw('flex gap-1')}>
                                                    {degrees && <Text style={[tw('font-iceland font-bold'), { fontSize: 16 }]}>{degrees}</Text>}
                                                    <Text style={[tw('font-iceland'), { fontSize: 12 }]}>{description}</Text>
                                                </div>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={tw('flex flex-row items-center gap-1 bg-accent text-black font-bold font-iceland px-3 py-2 uppercase')}>
                            <Text style={{ fontSize: 10 }}>\\ Téléchargé : {new Date().toLocaleDateString()}</Text>
                            {
                                themeType === 'season'
                                    ? <Text style={{ fontSize: 10 }}>\\ Saison : {seasonName}</Text>
                                    : <Text style={{ fontSize: 10 }}>\\ Thème : {themeId}</Text>
                            }
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
}

export default CV;