import { useEffect, useState } from 'react'
import { pdf, PDFViewer } from '@react-pdf/renderer'
import { useParams } from 'react-router'

import { useUser } from '@/contexts/UserContext'
import { me } from '@/data/me'

import CV from '@/components/CV'
import StudentCV from '@/components/StudentCV'
import { BiDownload } from 'react-icons/bi'
import { cn } from '@/utils/cn'

export default function CustomCVPage() {
    const { user } = useUser();
    const { type: typeParam } = useParams();

    const [type, setType] = useState(typeParam ?? 'student');

    const [fullname, setFullname] = useState('LQS');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [appliedData, setAppliedData] = useState({
        fullname: 'LQS',
        phoneNumber: ''
    });

    const isUpdating = fullname !== appliedData.fullname || phoneNumber !== appliedData.phoneNumber
    const isCivil = type === 'civil';

    const CurrentCV = isCivil ? CV : StudentCV;

    useEffect(() => {
        const timeout = setTimeout(() => {
            setAppliedData({
                fullname,
                phoneNumber
            })
        }, 800)

        return () => clearTimeout(timeout)
    }, [fullname, phoneNumber]);

    const downloadPDF = async () => {
        const blob = await pdf(
            <CurrentCV
                fullname={appliedData.fullname}
                phoneNumber={appliedData.phoneNumber}
                avatarURL="/portfolio/avatar.jpg"
                linkedIn={me.network.find(
                    (network) => network.name === 'LinkedIn'
                )}
                github={
                    user && {
                        username: user.login,
                        link: user.html_url
                    } as any
                }
            />
        ).toBlob()

        const url = URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = url
        link.download = `CV-${appliedData.fullname}.pdf`

        document.body.appendChild(link)
        link.click()

        URL.revokeObjectURL(url)
        document.body.removeChild(link)
    }

    return (
        <div className="w-full h-full flex flex-col lg:flex-row gap-6 p-8">
            <aside className="w-full lg:w-96 bg-zinc-100 border border-zinc-300 rounded-xl p-6 space-y-6">
                {/* Type */}
                <div className="space-y-3">
                    <h2 className="font-semibold">
                        Modèle
                    </h2>

                    <div className='flex gap-2 *:flex-1 *:rounded-xs'>
                        <button
                            onClick={() => setType('student')}
                            className={`
                                border p-4 text-left
                                transition-all
                                cursor-pointer
                                ${!isCivil
                                    ? 'border-purple-500 bg-purple-50'
                                    : 'bg-white hover:bg-zinc-50'
                                }
                            `}
                        >
                            <div className="font-bold">
                                Étudiant
                            </div>
                        </button>

                        <button
                            onClick={() => setType('civil')}
                            className={`
                                border p-4 text-left
                                transition-all
                                cursor-pointer
                                ${isCivil
                                    ? 'border-purple-500 bg-purple-50'
                                    : 'bg-white hover:bg-zinc-50'
                                }
                            `}
                        >
                            <div className="font-bold">
                                Civil
                            </div>
                        </button>

                    </div>
                </div>


                {/* Text Inputs */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-700">
                        Nom complet
                    </label>

                    <input
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        className="
                            w-full rounded-xs
                            border border-zinc-300
                            bg-white
                            px-4 py-3
                            text-sm
                            outline-none
                            transition-all
                            placeholder:text-zinc-400
                            focus:border-purple-500
                        "
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-700">
                        Téléphone
                    </label>

                    <input
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="
                            w-full rounded-xs
                            border border-zinc-300
                            bg-white
                            px-4 py-3
                            text-sm
                            outline-none
                            transition-all
                            placeholder:text-zinc-400
                            focus:border-purple-500
                        "
                    />
                </div>

                <button
                    onClick={downloadPDF}
                    className="
                        w-full
                        flex
                        items-center
                        justify-center
                        gap-2

                        rounded-xs
                        px-4
                        py-3

                        bg-purple-600
                        text-white
                        font-semibold

                        hover:bg-purple-700

                        cursor-pointer
                    "
                >
                    <BiDownload size={18} />
                    Télécharger le CV
                </button>
            </aside>


            {/* PDF Viewer */}
            <main className="flex-1 min-h-200 bg-zinc-200 rounded-xl overflow-hidden">
                <PDFViewer
                    showToolbar
                    className={cn('w-full h-full', isUpdating && 'animate-pulse')}
                >
                    <CurrentCV
                        fullname={appliedData.fullname}
                        phoneNumber={appliedData.phoneNumber}
                        avatarURL="/portfolio/avatar.jpg"
                        linkedIn={me.network.find(
                            (network) => network.name === 'LinkedIn'
                        )}
                        github={
                            user && {
                                username: user.login,
                                link: user.html_url
                            } as any
                        }
                    />
                </PDFViewer>
            </main>
        </div>
    )
}