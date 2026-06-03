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
				description: 'Mes compétences techniques et humaines en tant que développeur Full-Stack'
			},
			journey: {
				title: 'Parcours',
				description: 'Mon parcours professionnel et académique',
				themeColor: '#ff6b6b',
			},
			projects: {
				title: 'Projets',
				description: 'Mes projets personnels et mis en avant',
				themeColor: '#6b8cff',
			},
		})
	],
	resolve: {
		alias: {
			'@': path.resolve(import.meta.dirname, './src')
		}
	}
});
