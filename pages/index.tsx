import Layout from '@components/layout/layout.component';
import Menu from '@components/menu/menu.component';
import type { NextPage } from 'next';

const Home: NextPage = () => {
	return (
		<Layout>
			<Menu />
		</Layout>
	);
};

export default Home;
