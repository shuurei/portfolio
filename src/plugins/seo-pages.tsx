import fs from 'fs'
import path from 'path'
import { renderToString } from 'react-dom/server'
import type { Plugin } from 'vite'

interface RouteConfig {
    title?: string
    description: string
    image?: string
    themeColor?: string
}

function SeoHead({ meta }: { meta: RouteConfig }) {
    const fullTitle = meta.title ? `${meta.title} | Portfolio` : 'Portfolio'

    return (
        <head>
            <meta charSet='UTF-8' />
            <title>{fullTitle}</title>
            <meta name='description' content={meta.description} />
            <meta property='og:title' content={fullTitle} />
            <meta property='og:description' content={meta.description} />
            <meta property='og:type' content='website' />
            {meta.image && <meta property='og:image' content={meta.image} />}
            {meta.themeColor && <meta name='og:color' content={meta.themeColor} />}
            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:title' content={fullTitle} />
            <meta name='twitter:description' content={meta.description} />
            {meta.image && <meta name='twitter:image' content={meta.image} />}
            <script dangerouslySetInnerHTML={{
                __html: `const p=window.location.pathname.replace('/portfolio','').replace(/^\\//,'');window.location.replace('/portfolio/?'+p)`
            }} />
        </head>
    )
}

export function seoPagesPlugin(routes: Record<string, RouteConfig>): Plugin {
    return {
        name: 'seo-pages',
        closeBundle() {
            for (const [routePath, meta] of Object.entries(routes)) {
                const head = renderToString(<SeoHead meta={meta} />)
                const html = `<!doctype html>\n<html lang="en">\n${head}\n</html>`

                const dir = path.join('dist', routePath);
                fs.mkdirSync(dir, { recursive: true });
                fs.writeFileSync(path.join(dir, 'index.html'), html);
                console.log(`✅ dist/${routePath}/index.html`);
            }
        }
    }
}