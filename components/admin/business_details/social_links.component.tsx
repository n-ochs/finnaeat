import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { ISocialLinksData } from '@lib/types';
import { socialLinksRef } from '@lib/firebase.config';

import toast from 'react-hot-toast';
import { FaEdit, FaFacebookSquare, FaInstagram, FaTiktok } from 'react-icons/fa';
import { updateDoc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';

const SocialLinks: React.FC = () => {
	const [value, loading] = useDocument(socialLinksRef);

	const [socialLinks, setSocialLinks] = useState<ISocialLinksData>();

	/******************** FACEBOOK ********************/
	const [facebookEdit, setFacebookEdit] = useState<boolean>(false);
	const [newFacebookLink, setNewFacebookLink] = useState<string>('');

	const handleFacebookEdit: () => void = () => {
		setNewFacebookLink('');
		setFacebookEdit(true);
	};

	const handleFacebookSave: () => void = () => {
		if (newFacebookLink.length > 0) {
			updateDoc(socialLinksRef, 'social_links.facebook', newFacebookLink)
				.then(() => {
					toast.success('Updated Facebook Link');
					setFacebookEdit(false);
				})
				.catch(() => {
					toast.error('Error updating Facebook Link. Please try again.');
				});
		}
	};

	/******************** INSTAGRAM ********************/
	const [instagramEdit, setInstagramEdit] = useState<boolean>(false);
	const [newInstagramLink, setNewInstagramLink] = useState<string>('');

	const handleInstagramEdit: () => void = () => {
		setNewInstagramLink('');
		setInstagramEdit(true);
	};

	const handleInstagramSave: () => void = () => {
		if (newInstagramLink.length > 0) {
			updateDoc(socialLinksRef, 'social_links.instagram', newInstagramLink)
				.then(() => {
					toast.success('Updated Instagram Link');
					setInstagramEdit(false);
				})
				.catch(() => {
					toast.error('Error updating Instagram Link. Please try again.');
				});
		}
	};

	/******************** TIKTOK ********************/
	const [tiktokEdit, setTiktokEdit] = useState<boolean>(false);
	const [newTiktokLink, setNewTiktokLink] = useState<string>('');

	const handleTiktokEdit: () => void = () => {
		setNewTiktokLink('');
		setTiktokEdit(true);
	};

	const handleTiktokSave: () => void = () => {
		if (newTiktokLink.length > 0) {
			updateDoc(socialLinksRef, 'social_links.tiktok', newTiktokLink)
				.then(() => {
					toast.success('Updated TikTok Link');
					setTiktokEdit(false);
				})
				.catch(() => {
					toast.error('Error updating TikTok Link. Please try again.');
				});
		}
	};

	/******************** USE EFFECTS ********************/
	useEffect(() => {
		setSocialLinks(value?.data()?.social_links);
	}, [value]);

	return (
		<div className='space-y-4'>
			<div className='space-y-2'>
				<h2 className='text-2xl underline'>Social Media Links</h2>
				<p className='font-bold'>Must include 'https://www.' at start of all links</p>
			</div>
			{/* Facebook */}
			<div className='relative flex min-h-[68px] max-w-[95vw] items-center rounded-xl border-1 border-solid border-gray-600 bg-gray-100 py-4 px-5 shadow-lg lg:min-w-[496px]'>
				{facebookEdit ? (
					<div className='w-full'>
						<div className='flex w-full items-center'>
							<FaFacebookSquare size='18px' color='#C41D33' className='mr-2' />
							<input
								type='text'
								value={newFacebookLink}
								onChange={(e) => setNewFacebookLink(e.target.value)}
								autoFocus
								placeholder='INCLUDE: https://www.'
								className='w-full rounded-md border-1 border-solid border-gray-400 px-2 py-1'
							/>
						</div>
						<div className='flex items-center space-x-4'>
							<button
								className='btn-outlined mt-4 rounded-3xl normal-case'
								onClick={() => {
									setFacebookEdit(false);
									setNewFacebookLink('');
								}}
							>
								Cancel
							</button>
							<button className='btn-primary mt-4 rounded-3xl normal-case' disabled={newFacebookLink.length < 1} onClick={handleFacebookSave}>
								Save
							</button>
						</div>
					</div>
				) : (
					<>
						<FaEdit className='absolute top-[-7px] right-[-10px] cursor-pointer bg-white' size='18px' onClick={handleFacebookEdit} />
						<Link href={socialLinks?.facebook || ''}>
							<a className='flex items-center text-blue-600 underline'>
								<FaFacebookSquare size='18px' color='#C41D33' className='mr-2' />
								{loading ? <div className='h-4 w-72 animate-pulse rounded-xl bg-gray-400 lg:w-96' /> : socialLinks?.facebook}
							</a>
						</Link>
					</>
				)}
			</div>

			{/* Instagram */}
			<div className='relative flex min-h-[68px] max-w-[95vw] items-center rounded-xl border-1 border-solid border-gray-600 bg-gray-100 py-4 px-5 shadow-lg lg:min-w-[496px]'>
				{instagramEdit ? (
					<div className='w-full'>
						<div className='flex w-full items-center'>
							<FaInstagram size='18px' color='#C41D33' className='mr-2' />
							<input
								type='text'
								value={newInstagramLink}
								onChange={(e) => setNewInstagramLink(e.target.value)}
								autoFocus
								placeholder='INCLUDE: https://www.'
								className='w-full rounded-md border-1 border-solid border-gray-400 px-2 py-1'
							/>
						</div>
						<div className='flex items-center space-x-4'>
							<button
								className='btn-outlined mt-4 rounded-3xl normal-case'
								onClick={() => {
									setInstagramEdit(false);
									setNewInstagramLink('');
								}}
							>
								Cancel
							</button>
							<button className='btn-primary mt-4 rounded-3xl normal-case' disabled={newInstagramLink.length < 1} onClick={handleInstagramSave}>
								Save
							</button>
						</div>
					</div>
				) : (
					<>
						<FaEdit className='absolute top-[-7px] right-[-10px] cursor-pointer bg-white' size='18px' onClick={handleInstagramEdit} />
						<Link href={socialLinks?.instagram || ''}>
							<a className='flex items-center text-blue-600 underline'>
								<FaInstagram size='18px' color='#C41D33' className='mr-2' />
								{loading ? <div className='h-4 w-72 animate-pulse rounded-xl bg-gray-400 lg:w-96' /> : socialLinks?.instagram}
							</a>
						</Link>
					</>
				)}
			</div>

			{/* TikTok */}
			<div className='relative flex min-h-[68px] max-w-[95vw] items-center rounded-xl border-1 border-solid border-gray-600 bg-gray-100 py-4 px-5 shadow-lg lg:min-w-[496px]'>
				{tiktokEdit ? (
					<div className='w-full'>
						<div className='flex w-full items-center'>
							<FaTiktok size='18px' color='#C41D33' className='mr-2' />
							<input
								type='text'
								value={newTiktokLink}
								onChange={(e) => setNewTiktokLink(e.target.value)}
								autoFocus
								placeholder='INCLUDE: https://www.'
								className='w-full rounded-md border-1 border-solid border-gray-400 px-2 py-1'
							/>
						</div>
						<div className='flex items-center space-x-4'>
							<button
								className='btn-outlined mt-4 rounded-3xl normal-case'
								onClick={() => {
									setTiktokEdit(false);
									setNewTiktokLink('');
								}}
							>
								Cancel
							</button>
							<button className='btn-primary mt-4 rounded-3xl normal-case' disabled={newTiktokLink.length < 1} onClick={handleTiktokSave}>
								Save
							</button>
						</div>
					</div>
				) : (
					<>
						<FaEdit className='absolute top-[-7px] right-[-10px] cursor-pointer bg-white' size='18px' onClick={handleTiktokEdit} />
						<Link href={socialLinks?.tiktok || ''}>
							<a className='flex items-center text-blue-600 underline'>
								<FaTiktok size='18px' color='#C41D33' className='mr-2' />
								{loading ? <div className='h-4 w-72 animate-pulse rounded-xl bg-gray-400 lg:w-96' /> : socialLinks?.tiktok}
							</a>
						</Link>
					</>
				)}
			</div>
		</div>
	);
};

export default SocialLinks;
