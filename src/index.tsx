import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { RouterProvider } from 'react-router'
import router from './router'

import { UserProvider } from './contexts/UserContext'
import { ProjectsProvider } from './contexts/ProjectsContext'

import './index.css'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<UserProvider>
			<ProjectsProvider>
				<RouterProvider router={router} />
			</ProjectsProvider>
		</UserProvider>
	</StrictMode>
);