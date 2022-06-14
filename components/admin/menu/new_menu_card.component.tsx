import React, { useEffect, useState } from 'react';

import { INewMenuItem } from '@lib/types';

import ImageUploader from '@components/admin/menu/image_uploader.component';

interface INewMenuCardProps {
	index: number;
	foodCategory: string;
	handleCancel: (i: number) => void;
	handleSave: (i: number, newMenuItem: INewMenuItem) => void;
}

const NewMenuCard: React.FC<INewMenuCardProps> = ({ index, foodCategory, handleCancel, handleSave }) => {
	const [newItemTitle, setNewItemTitle] = useState<string>('');
	const [newItemDescription, setNewItemDescription] = useState<string>('');
	const [newItemPrice, setNewItemPrice] = useState<string>('');
	const [newItemImgUrl, setNewItemImgUrl] = useState<string>('');
	const [newMenuItem, setNewMenuItem] = useState<INewMenuItem>();

	const handleItemCancel: () => void = () => {
		setNewItemTitle('');
		setNewItemDescription('');
		setNewItemPrice('');
		setNewItemImgUrl('');
		handleCancel(index);
	};

	useEffect(() => {
		setNewMenuItem({
			name: newItemTitle,
			description: newItemDescription,
			price: newItemPrice,
			imgUrl: newItemImgUrl
		});
	}, [newItemTitle, newItemDescription, newItemPrice, newItemImgUrl]);

	return (
		<div className='relative w-[300px] transform rounded-xl border-1 border-solid border-gray-300 bg-white p-2 shadow-lg'>
			<div className='flex flex-col'>
				<ImageUploader isNewItem setNewItemImgUrl={setNewItemImgUrl} />
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
						<button className='btn-outlined rounded-3xl normal-case' disabled={foodCategory === 'New Category'} onClick={handleItemCancel}>
							Cancel
						</button>
						<button className='btn-primary rounded-3xl normal-case' disabled={foodCategory === 'New Category'} onClick={() => handleSave(index, newMenuItem)}>
							Save
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewMenuCard;
