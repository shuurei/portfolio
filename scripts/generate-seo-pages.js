import fs from 'fs'
import { desc } from 'motion/react-client';
import path from 'path'
import { title } from 'process';

const routes = [
	{
		path: 'journey',
		title: 'Parcours',
		description: 'Mon parcours professionnel et académique',
	},
	{
		path: 'projects',
		title: 'Projets',
		description: 'Mes projets personnels et mis en avant'
	}
];

const redirectScript = `
  const path = window.location.pathname
    .replace('/portfolio', '')
    .replace(/^\\//, '')
  window.location.replace('/portfolio/?' + path)
`.trim()

for (const route of routes) {
	const html = `
		<!doctype html>
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="description" content="${route.description}" />
				<meta property="og:title" content="${route.title}" />
				<meta property="og:description" content="${route.description}" />
				<meta property="og:type" content="website" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="${route.title}" />
				<meta name="twitter:description" content="${route.description}" />
				<title>${route.title}</title>
				<script>${redirectScript}<\/script>
			</head>
		</html>`;

	const dir = path.join('public', route.path);
	fs.mkdirSync(dir, { recursive: true });
	fs.writeFileSync(path.join(dir, 'index.html'), html);

	console.log(`✅ public/${route.path}/index.html`);
}