import React from 'react';
import Footer from './footer.component';
import Hero from './hero.component';
import Navbar from './navbar.component';

interface ILayoutProps {
	children?: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
	return (
		<>
			<Navbar />
			<Hero />
			{children || null}
			<Footer />
		</>
	);
};

export default Layout;
