import { createBrowserRouter } from 'react-router'

import App from './App'

import HomePage from '@/pages/Home'
import ProjectsPage from '@/pages/Projects'
import SkillsPage from './pages/Skills'
import JourneyPage from '@/pages/Journey'
import DebugCVPage from './pages/CV'

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
    },
    {
        path: '/debug/CV',
        Component: DebugCVPage
    }
], { basename: '/portfolio' });

export default router;