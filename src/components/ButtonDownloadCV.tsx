import type { ButtonHTMLAttributes } from 'react'
import { useSearchParams } from 'react-router'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { pdf } from '@react-pdf/renderer'
import CV from './CV'

import { me } from '@/data/me'
import { Button } from './common/Button'
import { useUser } from '@/contexts/UserContext'

export default function ButtonDownloadCV({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
    const [searchParams] = useSearchParams();
    const { user, loading } = useUser();

    const downloadPDF = async () => {
        if (loading) return

        const fullname = searchParams.get('fullname') ?? 'LQS';
        const phoneNumber = searchParams.get('phoneNumber');

        const blob = await pdf(
            <CV
                fullname={fullname}
                phoneNumber={phoneNumber}
                avatarURL='/portfolio/avatar.jpg'
                linkedIn={me.network.find((network) => network.name === 'LinkedIn')}
                github={user && {
                    username: user.login,
                    link: user.html_url
                } as any}
            />
        ).toBlob();

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url
        link.download = `Lenny ${fullname} - CV.pdf`
        document.body.appendChild(link);
        
        link.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(link);
    }

    return (
        <Button {...props} onClick={downloadPDF}>
            {loading
                ? <AiOutlineLoading3Quarters className='animate-spin' />
                : children
            }
        </Button>
    )
}