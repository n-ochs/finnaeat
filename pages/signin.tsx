import type { NextPage } from 'next';

import Layout from '@components/layout/layout.component';
import SignInForm from '@components/auth/signin_form.component';
import React from 'react';
import { Toaster } from 'react-hot-toast';

const SignIn: NextPage = () => {
	return (
		<Layout disableHero disableFooter>
			<Toaster />
			<div className='flex h-[80vh] w-screen items-center justify-center'>
				<SignInForm />
			</div>
		</Layout>
	);
};

export default SignIn;
