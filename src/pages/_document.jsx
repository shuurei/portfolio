import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang='fr'>
            <Head />
            <link rel='icon' href={process.env.NODE_ENV === 'production' ? '/portfolio/icon.svg' : '/icon.svg'} type='image/svg+xml' />
            <body className='relative bg-black p-4 md:h-svh md:px-12 md:py-10'>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
