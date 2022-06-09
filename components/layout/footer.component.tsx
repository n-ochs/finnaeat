import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';

import { useAuthContext } from '@lib/auth.context';
import { auth, db } from '@lib/firebase.config';
import { IContactInformationData, ISocialLinksData } from '@lib/types';

import { signOut } from 'firebase/auth';
import { doc } from 'firebase/firestore';
import { AiOutlineMail } from 'react-icons/ai';
import { BsTelephone } from 'react-icons/bs';
import { FaFacebookSquare, FaInstagram, FaTiktok } from 'react-icons/fa';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import toast, { Toaster } from 'react-hot-toast';

const Footer: React.FC = () => {
	const router: NextRouter = useRouter();
	const { activeUser, setActiveUser } = useAuthContext();

	const [contactInformation, setContactInformation] = useState<IContactInformationData>();
	const [socialLinks, setSocialLinks] = useState<ISocialLinksData>();

	const [value, loading] = useDocumentOnce(doc(db, 'business-details', 'mfMcy5LzgM81ONbwlyJ9'));

	const handleSignOut: () => void = () => {
		router.push('/');
		signOut(auth)
			.then(() => {
				setActiveUser(null);
				toast.success('Successfully signed out');
			})
			.catch(() => {
				toast.error('Trouble signing out. Please try again.');
			});
	};

	useEffect(() => {
		setContactInformation(value?.data()?.contact_information);
		setSocialLinks(value?.data()?.social_links);
	}, [value]);

	return (
		<footer className='w-screen bg-primaryBrown p-4'>
			<Toaster />
			<div className='space-y-3'>
				{/* Social Links */}
				<div className='flex items-center justify-center space-x-4'>
					<div className='rounded-md p-2 hover:bg-footerButtonHover'>
						<Link href={socialLinks?.facebook || 'https://www.facebook.com/Finna-Eat-109601537220056/'}>
							<a>
								<FaFacebookSquare size='35px' color='#C41D33' />
							</a>
						</Link>
					</div>
					<div className='rounded-md p-2 hover:bg-footerButtonHover'>
						<Link href={socialLinks?.instagram || 'https://www.instagram.com/finnaeatfoods/'} className='rounded-md p-2 hover:bg-footerButtonHover'>
							<a>
								<FaInstagram size='35px' color='#C41D33' />
							</a>
						</Link>
					</div>
					<div className='rounded-md p-2 hover:bg-footerButtonHover'>
						<Link href={socialLinks?.tiktok || 'https://www.tiktok.com/@finnaeatllc?'} className='rounded-md p-2 hover:bg-footerButtonHover'>
							<a>
								<FaTiktok size='35px' color='#C41D33' />
							</a>
						</Link>
					</div>
				</div>

				{/* Contact Information */}
				<div className='flex flex-col items-center justify-center space-y-1'>
					<a className='flex items-center text-white' href={`tel:${contactInformation?.phone}` || 'tel:504-215-3686'}>
						<BsTelephone className='mr-2' size='18px' />
						{loading ? <div className='h-4 w-36 animate-pulse rounded-xl bg-gray-100' /> : <>{contactInformation?.phone || '504-215-3686'}</>}
					</a>
					<a className='flex items-center text-white' href={`mailto:${contactInformation?.email}` || 'mailto:finnaeatfoods@gmail.com'}>
						<AiOutlineMail className='mr-2' size='18px' />
						{loading ? <div className='h-4 w-44 animate-pulse rounded-xl bg-gray-100' /> : <>{contactInformation?.email || 'finnaeatfoods@gmail.com'}</>}
					</a>
				</div>

				{/* Auth */}
				{activeUser ? (
					<div className='flex items-center justify-center space-x-4'>
						<button className='btn-primary rounded-2xl bg-primaryRed px-4 py-1 normal-case text-white' onClick={handleSignOut}>
							Sign Out
						</button>
						<Link href='/admin'>
							<a className='btn-primary rounded-2xl bg-primaryRed px-4 py-1 normal-case text-white'>Admin</a>
						</Link>
					</div>
				) : (
					<div className='flex items-center justify-center'>
						<Link href='/signin'>
							<a className='btn-primary rounded-2xl bg-primaryRed px-4 py-1 normal-case text-white'>Sign In</a>
						</Link>
					</div>
				)}
			</div>
		</footer>
	);
};

export default Footer;
