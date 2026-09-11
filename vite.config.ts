import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { seoPagesPlugin } from './src/plugins/seo-pages'

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
	}
});
