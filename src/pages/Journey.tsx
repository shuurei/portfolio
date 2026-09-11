import { SEO } from '@/components/SEO'
import { experiences, diplomas } from '@/data/journey'
import TimelineExperienceItem from '@/components/TimelineExperienceItem'
import TimelineDiplomaItem from '@/components/TimelineDiplomaItem'

export default function JourneyPage() {
    const allItems = [
        ...experiences.map((e) => ({ ...e, is: 'experience' as const })),
        ...diplomas.map((d) => ({ ...d, is: 'diploma' as const })),
    ].sort((a, b) => {
        return new Date(b.startAt).getTime() - new Date(a.startAt).getTime();
    });

    return (
        <>
            <SEO
                title='Parcours'
                description='Mon parcours professionnel et académique.'
            />

            <main className='w-full max-w-7xl mx-auto md:px-6 px-4 py-6 md:py-10 flex flex-col md:gap-8 gap-6'>
                <div className='flex flex-col'>
                    {allItems.map((item, i) => {
                        const sharedProps = {
                            title: item.title,
                            description: item.description,
                            startAt: item.startAt,
                            endAt: item.endAt,
                            isLast: i === allItems.length - 1,
                            delay: 0.2 + i * 0.1,
                        }

                        return item.is === 'experience' ? (
                            <TimelineExperienceItem
                                key={i}
                                {...sharedProps}
                                type={item.type}
                                location={item.location}
                            />
                        ) : (
                            <TimelineDiplomaItem
                                key={i}
                                {...sharedProps}
                                degrees={item.degrees}
                                school={item.school}
                            />
                        )
                    })}
                </div>
            </main>
        </>
    )
}