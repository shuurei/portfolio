import '@/global.css'

import Layout from '@/components/layout'

import { MenuProvider } from '@/contexts/MenuContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { UserProvider } from '@/contexts/UserContext'
import { ProjectsProvider } from '@/contexts/ProjectsContext'

export default function App({ Component, pageProps }) {
	return (
		<MenuProvider>
			<ThemeProvider>
				<UserProvider>
					<ProjectsProvider>
						<Layout>
							<Component {...pageProps} />
						</Layout>
					</ProjectsProvider>
				</UserProvider>
			</ThemeProvider>
		</MenuProvider>
	);
}
