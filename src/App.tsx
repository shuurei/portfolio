import { Outlet, ScrollRestoration } from 'react-router'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import GridCanvas from './components/GridCanvas'

import { ProjectsProvider } from './contexts/ProjectsContext'
import { UserProvider } from './contexts/UserContext'

export default function App() {
    return (
        <UserProvider>
            <ProjectsProvider>
                <ScrollRestoration />
                <Header />
                <main className='relative flex flex-1'>
                    <GridCanvas className='absolute -z-10 top-0 left-0' />
                    <Outlet />
                </main>
                <Footer />
            </ProjectsProvider>
        </UserProvider>
    );
}