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
		<nav className='relative mx-auto px-4 lg:px-16 py-6 bg-primaryRed'>
			<div className='flex items-center justify-between'>
				<h1 className='text-white uppercase font-medium text-xl'>Finna Eat</h1>
				<div className='hidden md:space-x-8 lg:space-x-12 md:flex'>
					{menuItems.map((item, index) => {
						return (
							<Link href={item.route} key={`menu_item_${index}`}>
								<a className='font-medium text-white hover:text-gray-200'>{item.label}</a>
							</Link>
						);
					})}
				</div>
				<a href='#' className='hidden p-3 px-6 pt-3 bg-primaryBrown text-white rounded-full baseline hover:bg-stone-800 md:block'>
					Book Us Today!
				</a>

				<button
					id='menu-btn'
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					className={isMenuOpen ? 'open block hamburger md:hidden focus:outline-none' : 'block hamburger md:hidden focus:outline-none'}
				>
					<span className='hamburger-top'></span>
					<span className='hamburger-middle'></span>
					<span className='hamburger-bottom'></span>
				</button>
			</div>

			<div className='md:hidden'>
				<div
					id='menu'
					className={
						isMenuOpen
							? 'mobile-menu'
							: 'absolute flex-col items-center hidden self-end py-8 mt-10 space-y-6 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md'
					}
				>
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
