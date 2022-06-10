import type { NextPage } from 'next';

import Layout from '@components/layout/layout.component';
import AuthVerification from '@components/auth/auth_verification.component';
import { Toaster } from 'react-hot-toast';
import BusinessDetails from '@components/admin/business_details.component';

const Admin: NextPage = () => {
	return (
		<AuthVerification>
			<Toaster />
			<Layout disableHero>
				<div className='flex items-center justify-center py-8'>
					<BusinessDetails />
				</div>
			</Layout>
		</AuthVerification>
	);
};

export default Admin;
