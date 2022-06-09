import React from 'react';
import Head from 'next/head';

import Footer from '@components/layout/footer.component';
import Hero from '@components/layout/hero.component';
import Navbar from '@components/layout/navbar.component';

interface ILayoutProps {
	disableHero?: boolean;
	disableFooter?: boolean;
	children?: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ disableHero, disableFooter, children }) => {
	return (
		<div className='overflow-x-hidden'>
			<Head>
				<title>Finna-Eat</title>
			</Head>
			<Navbar />
			{!disableHero && <Hero />}
			<main>{children || null}</main>
			{!disableFooter && <Footer />}
		</div>
	);
};

export default Layout;
