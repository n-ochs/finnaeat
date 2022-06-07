import React from 'react';
import Head from 'next/head';
import Footer from '@components/layout/footer.component';
import Hero from '@components/layout/hero.component';
import Navbar from '@components/layout/navbar.component';

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
