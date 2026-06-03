import { FaBriefcase } from 'react-icons/fa'
import BaseTimelineItem, { type BaseTimelineItemProps } from './BaseTimelineItem'

interface ExperienceItemProps extends Omit<BaseTimelineItemProps, 'icon' | 'accentDot' | 'accentBadge' | 'tag'> {
    type: string;
    location: string;
}

export default function TimelineExperienceItem({ type, location, ...props }: ExperienceItemProps) {
    return (
        <BaseTimelineItem
            {...props}
            tag={type}
            subtitle={location}
            icon={<FaBriefcase />}
            accentDot='bg-blue-500'
            accentBadge='bg-blue-50 border-blue-200 text-blue-500'
        />
    )
}