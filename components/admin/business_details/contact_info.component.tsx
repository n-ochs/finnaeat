import React, { useEffect, useState } from 'react';

import { IContactInformationData } from '@lib/types';
import { businessDetailsRef } from '@lib/firebase.config';

import toast from 'react-hot-toast';
import { AiOutlineMail } from 'react-icons/ai';
import { BsTelephone } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import { updateDoc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';

const ContactInfo: React.FC = () => {
	const [value, loading] = useDocument(businessDetailsRef);

	const [contactInformation, setContactInformation] = useState<IContactInformationData>();

	/******************** PHONE ********************/
	const [phoneEdit, setPhoneEdit] = useState<boolean>(false);
	const [newPhoneNumber, setNewPhoneNumber] = useState<string>('');

	const handlePhoneEdit: () => void = () => {
		setNewPhoneNumber('');
		setPhoneEdit(true);
	};

	const handlePhoneSave: () => void = () => {
		if (newPhoneNumber.length > 0) {
			updateDoc(businessDetailsRef, 'contact_information.phone', newPhoneNumber)
				.then(() => {
					toast.success('Updated Phone Number');
					setPhoneEdit(false);
				})
				.catch(() => {
					toast.error('Error updating Phone Number. Please try again.');
				});
		}
	};

	/******************** EMAIL ********************/
	const [emailEdit, setEmailEdit] = useState<boolean>(false);
	const [newEmailAddress, setNewEmailAddress] = useState<string>('');

	const handleEmailEdit: () => void = () => {
		setNewEmailAddress('');
		setEmailEdit(true);
	};

	const handleEmailSave: () => void = () => {
		if (newEmailAddress.length > 0) {
			updateDoc(businessDetailsRef, 'contact_information.email', newEmailAddress)
				.then(() => {
					toast.success('Updated Email Address');
					setEmailEdit(false);
				})
				.catch(() => {
					toast.error('Error updating Email Address. Please try again.');
				});
		}
	};

	/******************** USE EFFECTS ********************/
	useEffect(() => {
		setContactInformation(value?.data()?.contact_information);
	}, [value]);

	return (
		<div className='space-y-4'>
			<h2 className='text-2xl underline'>Business Details</h2>
			{/* Phone Number */}
			<div className='relative flex min-h-[68px] max-w-[95vw] items-center rounded-xl border-1 border-solid border-gray-600 bg-gray-100 py-4 px-5 shadow-lg lg:min-w-[496px]'>
				{phoneEdit ? (
					<div className='w-full'>
						<div className='flex w-full items-center'>
							<BsTelephone size='18px' color='#C41D33' className='mr-2' />
							<input
								type='text'
								value={newPhoneNumber}
								onChange={(e) => setNewPhoneNumber(e.target.value)}
								autoFocus
								placeholder='xxx-xxx-xxxx (must include dashes)'
								className='w-full rounded-md border-1 border-solid border-gray-400 px-2 py-1'
							/>
						</div>
						<div className='flex items-center space-x-4'>
							<button
								className='btn-outlined mt-4 rounded-3xl normal-case'
								onClick={() => {
									setPhoneEdit(false);
									setNewPhoneNumber('');
								}}
							>
								Cancel
							</button>
							<button className='btn-primary mt-4 rounded-3xl normal-case' disabled={newPhoneNumber.length < 1} onClick={handlePhoneSave}>
								Save
							</button>
						</div>
					</div>
				) : (
					<>
						<FaEdit className='absolute top-[-7px] right-[-10px] cursor-pointer bg-white' size='18px' onClick={handlePhoneEdit} />
						<BsTelephone className='mr-2' size='18px' />
						{loading ? <div className='h-4 w-36 animate-pulse rounded-xl bg-gray-400' /> : <>{contactInformation?.phone || 'No telephone'}</>}
					</>
				)}
			</div>

			{/* Email Address */}
			<div className='relative flex min-h-[68px] max-w-[95vw] items-center rounded-xl border-1 border-solid border-gray-600 bg-gray-100 py-4 px-5 shadow-lg lg:min-w-[496px]'>
				{emailEdit ? (
					<div className='w-full'>
						<div className='flex w-full items-center'>
							<AiOutlineMail size='18px' color='#C41D33' className='mr-2' />
							<input
								type='email'
								value={newEmailAddress}
								onChange={(e) => setNewEmailAddress(e.target.value)}
								autoFocus
								placeholder='example@gmail.com'
								className='w-full rounded-md border-1 border-solid border-gray-400 px-2 py-1'
							/>
						</div>
						<div className='flex items-center space-x-4'>
							<button
								className='btn-outlined mt-4 rounded-3xl normal-case'
								onClick={() => {
									setEmailEdit(false);
									setNewEmailAddress('');
								}}
							>
								Cancel
							</button>
							<button className='btn-primary mt-4 rounded-3xl normal-case' disabled={newEmailAddress.length < 1} onClick={handleEmailSave}>
								Save
							</button>
						</div>
					</div>
				) : (
					<>
						<FaEdit className='absolute top-[-7px] right-[-10px] cursor-pointer bg-white' size='18px' onClick={handleEmailEdit} />
						<AiOutlineMail className='mr-2' size='18px' />
						{loading ? <div className='h-4 w-36 animate-pulse rounded-xl bg-gray-400' /> : <>{contactInformation?.email || 'No email'}</>}
					</>
				)}
			</div>
		</div>
	);
};

export default ContactInfo;
