import { PDFViewer } from '@react-pdf/renderer'

import { useUser } from '@/contexts/UserContext'
import CV from '@/components/CV'
import { me } from '@/data/me'

export default function DebugCVPage() {
    const { user } = useUser();

    return (
        <div className='w-screen h-screen'>
            <PDFViewer
                showToolbar={true}
                className='w-full h-full'
            >
                <CV
                    fullname='LQS'
                    phoneNumber='0780376980'
                    avatarURL={'/portfolio/avatar.jpg'}
                    linkedIn={me.network.find((network) => network.name === 'LinkedIn')}
                    github={user && {
                        username: user.login,
                        link: user.html_url
                    } as any}
                />
            </PDFViewer>
        </div>
    );
}