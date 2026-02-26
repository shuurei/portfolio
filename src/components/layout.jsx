import Button from '@/components/common/button'
import Box from '@/components/box'
import CV from '@/components/CV'

import { Description, Sunny, DarkMode, Monitor } from '@mui/icons-material'
import Icon from '@/components/icon'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { useMenu } from '@/contexts/MenuContext'
import { useTheme } from '@/contexts/ThemeContext'
import { useProjects } from '@/contexts/ProjectsContext'

import useScreen from '@/hooks/useScreen'
import useSeason from '@/utils/season'

import userInfo from '@/data/userInfo'
import { pdf } from '@react-pdf/renderer'
import { useUser } from '@/contexts/UserContext'
import { useEffect, useMemo, useState } from 'react'

import userSkills from '@/data/userSkills'
import { useSearchParams } from 'next/navigation'

const UserAvatar = ({ canLoadAvatar }) => {
	const [avatar, setAvatar] = useState(userInfo.avatarPath);

	useEffect(() => {
		const saved = localStorage.getItem('custom-avatar');
		if (saved) setAvatar(saved);
	}, []);

	const handleChange = (e) => {
		const file = e.target.files?.[0]
		if (!file) return

		const reader = new FileReader();

		reader.onloadend = () => {
			setAvatar(reader.result);
			localStorage.setItem('custom-avatar', reader.result);
		}

		reader.readAsDataURL(file);
	}

	return (
		<Box className='p-2 relative'>
			{canLoadAvatar && (
				<label className='absolute h-full w-full'>
					<input
						type='file'
						accept='image/'
						className='hidden'
						onChange={handleChange}
					/>
				</label>
			)}
			<img src={avatar} alt='Avatar' />
		</Box>
	);
}

const links = [
	{
		title: 'à propos',
		href: '/'
	},
	{
		title: 'Compétences',
		href: '/skills'
	},
	{
		title: 'Projets',
		href: '/projects'
	},
	{
		title: 'logs',
		href: '/logs'
	}
];

export default function Layout({ children }) {
	const { mode, setMode } = useTheme();

	const { pathname, query } = useRouter();
	const { screenWidth } = useScreen();

	const searchParams = useSearchParams();
	const params = searchParams.toString();

	const { isOpen, toggleOpenState } = useMenu();

	const { currentTheme } = useTheme();
	const { currentSeason } = useSeason();

	const { profile } = useUser();
	const { allProjects, loading } = useProjects();

	const projects = allProjects
		.filter(({ description, language, updated_at, showOnCV, fork }) => showOnCV || (description && language && updated_at && !fork))
		.sort((a, b) => {
			if (a.showOnCV) {
				return 1;
			}

			return a.stargazers_count - b.stargazers_count;
		});

	const skillsNeeded = useMemo(() => {
		return query.needs?.split(',') ?? [];
	}, [query.needs]);

	const skills = userSkills
		.map((skill) => {
			let name = skill.name.toLowerCase();

			skill.isNeeded = skillsNeeded.includes(name);

			if (name === 'react-native') {
				name = 'RN'
			}

			return {
				...skill,
				name
			};
		})
		.sort((a, b) => b.isNeeded - a.isNeeded)
		.slice(0, 20);

	const downloadPDF = async () => {
		if (loading) return;

		const blob = await pdf(
			<CV
				skills={skills}
				projects={projects}
				accentColor={currentTheme}
				seasonName={currentSeason.name}
				theme={document.documentElement.getAttribute('data-theme')}
				showAvatarCV={(query.showAvatarCV ?? 'true') === 'true'}
				avatarURL={localStorage.getItem('custom-avatar')}
			/>
		).toBlob();

		const url = URL.createObjectURL(blob);

		const link = document.createElement('a');
		link.href = url;
		link.download = 'Lenny - CV.pdf';
		document.body.appendChild(link);
		link.click();

		URL.revokeObjectURL(url);
		document.body.removeChild(link);
	};

	return (
		<div className='flex flex-col md:flex-row h-full gap-4'>
			{/* Left Side */}
			<div className='flex flex-col gap-4'>
				<div className='flex flex-wrap gap-4 justify-center md:flex-nowrap md:flex-col md:max-w-xs'>
					<div className='min-w-40 max-w-90 flex-1'>
						<UserAvatar canLoadAvatar={query.canLoadAvatar === 'true'} />
					</div>

					<div className='flex flex-col gap-2 w-full flex-1'>
						<hgroup className='flex flex-col uppercase'>
							<h4 className='text-lg font-iceland'>prénom</h4>
							<div className='text-accent text-xl font-bold font-bigShouldersDisplay'>Lenny</div>
						</hgroup>

						<hgroup className='flex flex-col uppercase'>
							<h4 className='text-lg font-iceland'>Localisation</h4>
							<div className='text-accent text-xl font-bold font-bigShouldersDisplay'>{userInfo.localisation}</div>
						</hgroup>

						<hgroup className='flex flex-col uppercase'>
							<h4 className='text-lg font-iceland'>Âge</h4>
							<div className='text-accent text-xl font-bold font-bigShouldersDisplay'>{userInfo.old} ans</div>
						</hgroup>
					</div>
				</div>

				<div className='flex flex-col gap-2'>
					{profile?.hireable !== null && (
						<div className='flex items-center gap-2'>
							<span className='relative flex h-4 w-4'>
								<span className='animate-ping absolute inline-flex w-full rounded-full bg-accent opacity-75 h-full'></span>
								<span className='relative inline-flex rounded-full h-4 w-4 bg-accent'></span>
							</span>

							<p className='text-xl font-bold font-bigShouldersDisplay text-nowrap'>Recherche du travail</p>
						</div>
					)}

					<hgroup className='flex flex-col uppercase'>
						<h4 className='text-lg font-iceland'>E-mail</h4>
						<a className='text-accent text-xl font-bold font-bigShouldersDisplay underline' href={`mailto:${userInfo.email}`}>{userInfo.email}</a>
					</hgroup>

					<div className='flex flex-col uppercase col-span-2 max-w-100'>
						<h4 className='text-lg font-iceland'>Sociales</h4>
						<div className='flex flex-wrap gap-2'>
							{userInfo.network.map(({ name, link, icon }) => {
								const isGithub = name === 'GitHub';

								return (
									<Button className='flex-1 min-w-35' href={isGithub ? link.concat(profile?.login) : link} key={name}>
										<div className='flex items-center justify-between'>
											<p>{name}</p>
											<Icon component={icon} />
										</div>
									</Button>
								)
							})}
							<Button className='flex-1 min-w-fit text-nowrap' onClick={downloadPDF}>
								<div className='flex items-center justify-between'>
									<p>{loading ? 'Préparation du CV..' : 'Télécharger le CV'}</p>
									<Description />
								</div>
							</Button>
						</div>
					</div>

					<div className='flex flex-col'>
						<h4 className='text-lg font-iceland'>Thème</h4>
						<div className='flex bg-black/20 border-accent border-2 w-fit'>
							<button
								onClick={() => setMode('light')}
								className={`p-2  
										${mode === 'light'
										? 'bg-accent text-black'
										: 'hover:bg-black/10 dark:hover:bg-white/10'
									}`}
							>
								<Sunny size={20} />
							</button>

							<button
								onClick={() => setMode('dark')}
								className={`p-2 
										${mode === 'dark'
										? 'bg-accent text-white'
										: 'hover:bg-black/10 dark:hover:bg-white/10'
									}`}
							>
								<DarkMode size={20} />
							</button>

							<button
								onClick={() => setMode('system')}
								className={`p-2 
										${mode === 'system'
										? 'bg-accent text-black'
										: 'hover:bg-black/10 dark:hover:bg-white/10'
									}`}
							>
								<Monitor size={20} />
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className='h-full flex flex-col items-center gap-4 w-full'>
				{/* Navbar */}
				<div className='w-full max-w-5xl'>
					{screenWidth < 768 ? (
						<div>
							{/* Menu for max-md */}
							<button
								className='sticky top-0 left-0 w-full py-2 font-bold border-2 border-accent text-accent text-xl uppercase cursor-pointer'
								onClick={() => toggleOpenState()}
							>Navigation</button>

							{isOpen && (
								<div className='z-50 fixed top-0 left-0 w-full h-full not-dark:bg-white dark:bg-black border-2 dark:border-white/13 not-dark:border-black/13'>
									<div className="flex justify-between items-center border-b-2 dark:border-white/10 not-dark:border-black/10 px-4 py-2">
										<h2 className='text-2xl tracking-wide'>NAVIGATION</h2>
										<span className="text-3xl cursor-pointer" onClick={() => toggleOpenState()}>X</span>
									</div>
									<div className='flex flex-col gap-4 p-4'>
										{links.map(({ title, href }, idx) => (
											<Link
												onClick={() => toggleOpenState()}
												className={`border-l-2 dark:border-white/40 not-dark:border-black/40 dark:bg-white/8 not-dark:bg-black/8 px-2 py-1 [&.active]:border-accent [&.active]:bg-accent/40 ${pathname === href ? 'active' : ''}`}
												href={params ? `${href}?${params}` : href}
												key={idx}
											>
												<span className='text-lg tracking-wider font-bigShouldersDisplay uppercase'>{title}</span>
											</Link>
										))}
									</div>
								</div>
							)}
						</div>
					) : (
						<div className='flex gap-4'>
							{/* Menu for min-md */}
							{links.map(({ title, href }, idx) => (
								<Link
									className={`bevel-br flex border-l-3 dark:border-white/40 not-dark:border-black/40 flex-1 p-2 dark:bg-white/8 not-dark:bg-black/8 dark:hover:bg-white/10 not-dark:hover:bg-black/10 [&.active]:bg-accent/50 [a.active]:border-accent ${pathname === href ? 'active' : ''}`}
									href={params ? `${href}?${params}` : href}
									key={idx}
								>
									<span className='uppercase font-bigShouldersDisplay font-bold text-lg'>{title}</span>
								</Link>
							))}
						</div>
					)}
				</div>

				{/* Children box */}
				<div className='overflow-hidden p-0.5 w-full max-w-6xl'>
					<Box className='relative w-full h-full border-2 border-white/13 dark:bg-black/75 not-dark:bg-black/5 backdrop-blur-2xl'>
						<div className='grow overflow-hidden flex p-2 w-full h-full lg:p-4'>
							<div className='overflow-auto flex-1 max-h-full'>
								{children}
							</div>
						</div>
					</Box>
				</div>
			</div>
		</div>
	);
}