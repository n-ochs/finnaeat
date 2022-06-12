import type { NextPage } from 'next';

import AuthVerification from '@components/auth/auth_verification.component';
import ContactInfo from '@components/admin/business_details/contact_info.component';
import Layout from '@components/layout/layout.component';
import SocialLinks from '@components/admin/business_details/social_links.component';

import { Toaster } from 'react-hot-toast';
import EditableMenu from '@components/admin/menu/editable_menu.component';

const Admin: NextPage = () => {
	return (
		<AuthVerification>
			<Toaster />
			<Layout disableHero>
				<div className='p-12'>
					<EditableMenu />
				</div>
				<div className='flex items-center justify-center py-8'>
					<div className='flex flex-col space-y-12'>
						<SocialLinks />
						<ContactInfo />
					</div>
				</div>
			</Layout>
		</AuthVerification>
	);
};

export default Admin;
