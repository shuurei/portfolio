import { FaGraduationCap } from 'react-icons/fa'
import BaseTimelineItem, { type BaseTimelineItemProps } from './BaseTimelineItem'

interface DiplomaItemProps extends Omit<BaseTimelineItemProps, 'icon' | 'accentDot' | 'accentBadge' | 'tag'> {
    degrees: string
    school: string
}

export default function TimelineDiplomaItem({ degrees, school, ...props }: DiplomaItemProps) {
    return (
        <BaseTimelineItem
            {...props}
            tag={degrees}
            subtitle={school}
            icon={<FaGraduationCap />}
            accentDot='bg-violet-500'
            accentBadge='bg-violet-50 border-violet-200 text-violet-500'
        />
    )
}