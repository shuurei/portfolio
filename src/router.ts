import { createBrowserRouter } from 'react-router'

import App from './App'

import HomePage from '@/pages/Home'
import ProjectsPage from '@/pages/Projects'
import SkillsPage from './pages/Skills'
import JourneyPage from '@/pages/Journey'

const router = createBrowserRouter([
    {
        Component: App,
        children: [
            {
                path: '/',
                Component: HomePage
            },
            {
                path: '/projects',
                Component: ProjectsPage
            },
            {
                path: '/skills',
                Component: SkillsPage
            },
            {
                path: '/journey',
                Component: JourneyPage
            }
        ]
    }
], { basename: '/portfolio' });

export default router;