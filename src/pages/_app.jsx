import '@/global.css'

import { useRouter } from 'next/router'

import Layout from '@/components/layout'

import { MenuProvider } from '@/contexts/MenuContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { UserProvider } from '@/contexts/UserContext'
import { ProjectsProvider } from '@/contexts/ProjectsContext'

export default function App({ Component, pageProps }) {
	const router = useRouter()

	console.log(process.env.NODE_ENV, router.pathname)

	const isDev = process.env.NODE_ENV !== 'production';
	const isDebugCV = router.pathname === '/debug/cv';

	return (
		<MenuProvider>
			<ThemeProvider>
				<UserProvider>
					<ProjectsProvider>
						{isDev && isDebugCV ?(
							<Component {...pageProps} />
						) : (
							<Layout>
								<Component {...pageProps} />
							</Layout>
						)}
					</ProjectsProvider>
				</UserProvider>
			</ThemeProvider>
		</MenuProvider>
	);
}
