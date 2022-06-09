import type { NextPage } from 'next';

import Layout from '@components/layout/layout.component';
import Menu from '@components/menu/menu.component';

const Home: NextPage = () => {
	return (
		<Layout>
			<Menu />
		</Layout>
	);
};

export default Home;
