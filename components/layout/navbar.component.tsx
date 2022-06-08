import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import React, { useState } from 'react';

const Navbar: React.FC = () => {
	const router: NextRouter = useRouter();

	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	const menuItems: { route: string; label: string }[] = [
		{ route: '/', label: 'Home' },
		{ route: '/about', label: 'About' },
		{ route: '#', label: 'Find' },
		{ route: '#', label: 'Events' },
		{ route: '#', label: 'Contact' }
	];

	return (
		<nav className='relative mx-auto bg-primaryRed px-4 py-6 lg:px-16'>
			<div className='flex items-center justify-between'>
				<h1 className='text-xl font-medium uppercase text-white'>Finna-Eat</h1>
				<div className='hidden md:flex md:space-x-8 lg:space-x-12'>
					{menuItems.map((item, index) => {
						return (
							<Link href={item.route} key={`menu_item_${index}`}>
								<a className={router.pathname === item.route ? 'navbar-item bg-primaryRedActiveRoute' : 'navbar-item'}>{item.label}</a>
							</Link>
						);
					})}
				</div>
				<a href='#' className='baseline hidden rounded-full bg-primaryBrown p-3 px-6 pt-3 text-white hover:bg-stone-800 md:block'>
					Book Us Today!
				</a>

				<button
					id='menu-btn'
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					className={isMenuOpen ? 'open hamburger z-30 block focus:outline-none md:hidden' : 'hamburger block focus:outline-none md:hidden'}
				>
					<span className='hamburger-top'></span>
					<span className='hamburger-middle'></span>
					<span className='hamburger-bottom'></span>
				</button>
			</div>

			<div className='md:hidden'>
				<div
					id='menu'
					className={isMenuOpen ? 'absolute inset-0 z-20 flex h-screen w-screen flex-col bg-black text-white opacity-90' : 'hidden'}
					onClick={() => setIsMenuOpen(false)}
				></div>
				{isMenuOpen && (
					<div className='absolute inset-x-0 z-30 flex w-full flex-col'>
						{menuItems.map((item, index) => {
							return (
								<Link href={item.route} key={`mobile_menu_item_${index}`}>
									<a className='flex h-12 items-center justify-center font-medium text-white'>{item.label}</a>
								</Link>
							);
						})}
						{isMenuOpen && (
							<Link href='#'>
								<a className='flex h-12 items-center justify-center font-medium text-white'>Book Us Today!</a>
							</Link>
						)}
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
