import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

// import { useUser } from '@/contexts/UserContext'
import userInfo from '@/data/userInfo'

import CV from '@/components/CV'

const PDFViewer = dynamic(
    async () => (await import('@react-pdf/renderer')).PDFViewer,
    {
        ssr: false
    }
)

export default function DebugCV() {
    const [avatarURL, setAvatarURL] = useState(null);
    // const { profile } = useUser();

    useEffect(() => {
        setAvatarURL(localStorage.getItem('custom-avatar'));
    }, []);

    return (
        <div className='w-screen h-screen'>
            <PDFViewer
                showToolbar={true}
                className='w-full h-full'
            >
                <CV
                    fullname='LOQUAIS'
                    phoneNumber='0780376980'
                    avatarURL={avatarURL}
                    linkedIn={userInfo.network.find((network) => network.name === 'LinkedIn')}
                    // github={profile && {
                        // username: profile.login,
                        // link: profile.html_url
                    // }}
                />
            </PDFViewer>
        </div>
    );
}