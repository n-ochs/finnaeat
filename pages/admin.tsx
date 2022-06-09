import type { NextPage } from 'next';

import Layout from '@components/layout/layout.component';
import AuthVerification from '@components/auth/auth_verification.component';
import { Toaster } from 'react-hot-toast';

const Admin: NextPage = () => {
	return (
		<AuthVerification>
			<Toaster />
			<Layout disableHero>
				<div className='flex h-[80vh] w-screen items-center justify-center bg-slate-200'>admin page</div>
			</Layout>
		</AuthVerification>
	);
};

export default Admin;
