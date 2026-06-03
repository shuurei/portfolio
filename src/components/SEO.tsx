interface SEOProps {
    title?: string
    description: string
    image?: string
}

export function SEO({ title, description, image }: SEOProps) {
    const fullTitle = title ? `${title} | Portfolio` : 'Portfolio'

    return (
        <>
            <title>{fullTitle}</title>
            <meta name='description' content={description} />
            <meta property='og:title' content={fullTitle} />
            <meta property='og:description' content={description} />
            {image && <meta property='og:image' content={image} />}
            <meta property='og:type' content='website' />
            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:title' content={fullTitle} />
            <meta name='twitter:description' content={description} />
            {image && <meta name='twitter:image' content={image} />}
        </>
    );
}