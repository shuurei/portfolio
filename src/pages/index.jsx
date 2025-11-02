import Head from 'next/head'

const sections = [
    {
        id: 'introduction',
        title: 'Une brève introduction de ma vie',
        content: [
            "J'ai découvert la programmation informatique à 12 ans avec Minecraft Java Edition, ce qui a éveillé ma passion pour la programmation.",
            "J'ai commencé avec des bots Discord en JavaScript, puis j'ai appris à créer des sites web en HTML, CSS et JavaScript.",
            "Par la suite, j'ai exploré des frameworks comme Next.js, React et React Native, tout en m'intéressant au développement de jeux vidéo avec Godot Engine avec le GDScript proche du python.",
            "Curieux et polyvalent, je souhaite évoluer dans différents domaines, que ce soit le back-end, le front-end ou le mobile, toujours guidé par l'envie de programmer."
        ].join('\n')
    },
    {
        id: 'career',
        title: 'Carrière et développement',
        content: [
            "Mon parcours en programmation est en constante évolution.",
            "Depuis mes premiers pas avec Minecraft, j'ai toujours cherché à me diversifier et à m'améliorer.",
            "Chaque projet, qu'il soit lié à un bot, un site web ou un jeu vidéo, est une occasion d'acquérir de nouvelles compétences.",
            "Je suis convaincu que l'apprentissage continu est essentiel dans le domaine technologique, et j'adore explorer constamment de nouveaux outils, frameworks et langages pour rester à la pointe de l'innovation."
        ].join('\n')
    },
    {
        id: 'wishes',
        title: 'Mes souhaits',
        content: [
            "À long terme, mon objectif est clair : devenir développeur de jeux vidéo.",
            "Depuis mes débuts dans la programmation, cette branche m’a toujours fasciné par sa capacité à allier créativité et technique pour créer des expériences immersives et interactives.",
            "Je souhaite continuer à enrichir mes compétences en explorant divers aspects du développement, comme le web ou le mobile, tout en restant orienté vers mon objectif final.",
            "Ces expériences me permettront d’acquérir une perspective globale et des outils variés, essentiels pour exceller dans l’industrie du jeu vidéo. Créer des univers captivants, travailler sur des mécaniques innovantes et collaborer avec d'autres passionnés dans des projets ambitieux sont des aspirations qui me motivent à chaque étape de mon apprentissage et de ma carrière."
        ].join('\n')
    },
];


export default function Home() {
    return (
        <>
            <Head>
                <title>Portfolio</title>
                <meta name='description' content='À propos de moi' />
            </Head>

            <main className='flex flex-col gap-4'>
                {sections.map(({ id, title, content }) => (
                    <div className='flex flex-col gap-2' key={id} id={id}>
                        <div className='bevel-bl flex justify-between bg-accent text-2xl xs:text-3xl -tracking-tight font-bold px-3 py-1 uppercase text-black'>
                            <h2 className='font-iceland'>{title}</h2>
                        </div>
                        <p className='text-lg ml-2'>{content}</p>
                    </div>
                ))}
            </main>
        </>
    );
}
