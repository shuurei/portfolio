import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { seoPagesPlugin } from './src/plugins/seo-pages.tsx'

const now = new Date();

// https://vite.dev/config/
export default defineConfig({
	base: '/portfolio/',
	plugins: [
		react(),
		babel({ presets: [reactCompilerPreset()] }),
		tailwindcss(),
		seoPagesPlugin({
			skills: {
				title: 'Compétences',
				description: 'Mes compétences techniques et humaines en tant que développeur Full-Stack',
				themeColor: '#c1a8ff',
			},
			journey: {
				title: 'Parcours',
				description: 'Mon parcours professionnel et académique',
				themeColor: '#c1a8ff',
			},
			projects: {
				title: 'Projets',
				description: 'Mes projets personnels et mis en avant',
				themeColor: '#c1a8ff',
			},
		})
	],
	resolve: {
		alias: {
			'@': path.resolve(import.meta.dirname, './src')
		}
	},
	define: {
		__BUILD_VERSION__: JSON.stringify(`v${String(now.getUTCFullYear()).slice(-2)}.${String(now.getUTCMonth() + 1).padStart(2, '0')}.${String(now.getUTCDate()).padStart(2, '0')}`),
		__BUILD_NUMBER__: JSON.stringify(`${String(now.getUTCHours()).padStart(2, '0')}${String(now.getUTCMinutes()).padStart(2, '0')}${String(now.getUTCSeconds()).padStart(2, '0')}`),
	}
});
