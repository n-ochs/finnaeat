import React, { FormEvent, useRef, useState } from 'react';
import { NextRouter, useRouter } from 'next/router';

import { auth } from '@lib/firebase.config';
import { useAuthContext } from '@lib/auth.context';

import { User, signInWithEmailAndPassword } from 'firebase/auth';
import toast from 'react-hot-toast';

const SignInForm: React.FC = () => {
	const router: NextRouter = useRouter();
	const { setActiveUser } = useAuthContext();
	const emailAddressInputRef: React.MutableRefObject<HTMLInputElement> = useRef(null);

	const [emailAddress, setEmailAddress] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const handleSignIn: (e: FormEvent) => void = (e: FormEvent) => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, emailAddress, password)
			.then((userCredentials) => {
				const user: User = userCredentials?.user;
				setActiveUser(user);
				toast.success('Successfully signed in');
				router.push('/admin');
			})
			.catch(() => {
				toast.error('Invalid credentials. Please try again.');
				setEmailAddress('');
				setPassword('');
				emailAddressInputRef.current.focus();
			});
	};

	return (
		<form className='w-80 space-y-8 rounded-xl border-1 border-solid border-gray-300 bg-white px-10 pt-4 pb-8 shadow-lg' onSubmit={handleSignIn}>
			<h2 className='text-2xl font-semibold text-gray-900'>Sign In</h2>
			<div className='relative'>
				<input
					id='email'
					name='email'
					type='text'
					className='peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-primaryRed focus:outline-none'
					placeholder='Email address'
					value={emailAddress}
					ref={emailAddressInputRef}
					onChange={(e) => setEmailAddress(e.target.value)}
				/>
				<label htmlFor='email' className='auth-input'>
					Email address
				</label>
			</div>
			<div className='relative'>
				<input
					id='password'
					type='password'
					name='password'
					className='peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-primaryRed focus:outline-none'
					placeholder='Password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<label htmlFor='password' className='auth-input'>
					Password
				</label>
			</div>

			<button className='btn-primary w-full text-center normal-case' type='submit'>
				Sign In
			</button>
		</form>
	);
};

export default SignInForm;
