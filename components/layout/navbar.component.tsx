import Link from 'next/link';
import React, { useState } from 'react';

const Navbar: React.FC = () => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	const menuItems: { route: string; label: string }[] = [
		{ route: '#', label: 'Home' },
		{ route: '#', label: 'About' },
		{ route: '#', label: 'Find' },
		{ route: '#', label: 'Events' },
		{ route: '#', label: 'Contact' }
	];

	return (
		<nav className='relative mx-auto bg-primaryRed px-4 py-6 lg:px-16'>
			<div className='flex items-center justify-between'>
				<h1 className='text-xl font-medium uppercase text-white'>Finna Eat</h1>
				<div className='hidden md:flex md:space-x-8 lg:space-x-12'>
					{menuItems.map((item, index) => {
						return (
							<Link href={item.route} key={`menu_item_${index}`}>
								<a className='font-medium text-white hover:text-gray-200'>{item.label}</a>
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
					className={isMenuOpen ? 'open hamburger block focus:outline-none md:hidden' : 'hamburger block focus:outline-none md:hidden'}
				>
					<span className='hamburger-top'></span>
					<span className='hamburger-middle'></span>
					<span className='hamburger-bottom'></span>
				</button>
			</div>

			<div className='md:hidden'>
				<div id='menu' className={isMenuOpen ? 'mobile-menu' : 'hidden'}>
					{menuItems.map((item, index) => {
						return (
							<Link href={item.route} key={`mobile_menu_item_${index}`}>
								<a className='font-medium hover:text-gray-200'>{item.label}</a>
							</Link>
						);
					})}
					<Link href='#'>
						<a className='font-medium hover:text-gray-200'>Book Us Today!</a>
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
