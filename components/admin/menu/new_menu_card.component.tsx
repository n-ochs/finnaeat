import React, { useEffect, useState } from 'react';

import { INewMenuItem } from '@lib/types';

import { FaRegImage } from 'react-icons/fa';

interface INewMenuCardProps {
	index: number;
	handleCancel: (i: number) => void;
	handleSave: (i: number, newMenuItem: INewMenuItem) => void;
}

const NewMenuCard: React.FC<INewMenuCardProps> = ({ index, handleCancel, handleSave }) => {
	const [newItemTitle, setNewItemTitle] = useState<string>('');
	const [newItemDescription, setNewItemDescription] = useState<string>('');
	const [newItemPrice, setNewItemPrice] = useState<string>('');
	const [newMenuItem, setNewMenuItem] = useState<INewMenuItem>();

	const handleItemCancel: () => void = () => {
		setNewItemTitle('');
		setNewItemDescription('');
		setNewItemPrice('');
		handleCancel(index);
	};

	useEffect(() => {
		setNewMenuItem({
			name: newItemTitle,
			description: newItemDescription,
			price: newItemPrice,
			imgUrl: ''
		});
	}, [newItemTitle, newItemDescription, newItemPrice]);

	return (
		<div className='relative w-[300px] transform rounded-xl border-1 border-solid border-gray-300 bg-white p-2 shadow-lg'>
			<div className='flex flex-col'>
				<div className='mx-auto flex h-[192px] w-full rounded-xl bg-gray-400'>
					<span className='m-auto flex items-center font-bold text-gray-700'>
						<FaRegImage size='18px' />
						<p className='my-0 ml-2'> Select a new image</p>
					</span>
				</div>
				<div className='space-y-2 p-2'>
					<input
						type='text'
						value={newItemTitle}
						onChange={(e) => setNewItemTitle(e.target.value)}
						placeholder='Item Title'
						className='w-full rounded-md border-1 border-solid border-gray-400 px-2 py-1'
					/>
					<textarea
						className='container rounded-md border-1 border-solid border-gray-400 px-2 py-1 text-sm text-gray-600'
						rows={4}
						cols={50}
						placeholder='Item Description'
						value={newItemDescription}
						onChange={(e) => setNewItemDescription(e.target.value)}
					/>
					<input
						type='text'
						value={newItemPrice}
						onChange={(e) => setNewItemPrice(e.target.value)}
						placeholder='Item Price (optional)'
						className='mt-0 w-full rounded-md border-1 border-solid border-gray-400 px-2 py-1 text-sm'
					/>
					<div className='flex items-center space-x-4'>
						<button className='btn-outlined rounded-3xl normal-case' onClick={handleItemCancel}>
							Cancel
						</button>
						<button className='btn-primary rounded-3xl normal-case' onClick={() => handleSave(index, newMenuItem)}>
							Save
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewMenuCard;
