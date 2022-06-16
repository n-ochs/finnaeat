import React from 'react';
import Head from 'next/head';

import Footer from '@components/layout/footer.component';
import Hero from '@components/layout/hero.component';
import Navbar from '@components/layout/navbar.component';

interface ILayoutProps {
	disableHero?: boolean;
	disableFooter?: boolean;
	title?: string;
	children?: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ disableHero, disableFooter, title, children }) => {
	return (
		<div className='h-screen'>
			<Head>
				<title>{title ? title : 'Finna-Eat'}</title>
			</Head>
			<Navbar />
			{!disableHero && <Hero />}
			<main>{children || null}</main>
			{!disableFooter && <Footer />}
		</div>
	);
};

export default Layout;
