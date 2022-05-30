import Head from 'next/head';
import React from 'react';
import Footer from './footer.component';
import Hero from './hero.component';
import Navbar from './navbar.component';

interface ILayoutProps {
	children?: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
	return (
		<div className='overflow-x-hidden'>
			<Head>
				<title>Finna-Eat</title>
			</Head>
			<Navbar />
			<Hero />
			{children || null}
			<Footer />
		</div>
	);
};

export default Layout;
