import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { IMenuCardProps, IPreparedFoodMenuData } from '@lib/types';
import { FaEdit, FaRegImage } from 'react-icons/fa';
import { updateDoc } from 'firebase/firestore';
import { foodMenuRef } from '@lib/firebase.config';
import toast from 'react-hot-toast';

interface IEditableMenuCardProps extends IMenuCardProps {
	itemIndex: number;
	categoryIndex: number;
	menuData: IPreparedFoodMenuData;
}

const EditableMenuCard: React.FC<IEditableMenuCardProps> = ({ itemTitle, itemDescription, itemIndex, categoryIndex, menuData }) => {
	const [isEditable, setIsEditable] = useState<boolean>(false);
	const [newItemTitle, setNewItemTitle] = useState<string>('');
	const [newItemDescription, setNewItemDescription] = useState<string>('');
	const [updatedItem, setUpdatedItem] = useState<any>({});
	const [updatedMenu, setUpdatedMenu] = useState<IPreparedFoodMenuData>(menuData);

	const handleCancel: () => void = () => {
		setNewItemTitle('');
		setNewItemDescription('');
		setIsEditable(false);
	};

	// const handleSave: () => void = () => {
	// 	console.log('itemIndex: ', itemIndex);
	// 	console.log('itemCategory: ', itemCategory);
	// 	console.log('categoryIndex: ', categoryIndex);
	// };

	// `food[${categoryIndex}].items[${itemIndex}]`

	const handleSave: () => void = () => {
		if (newItemTitle.length > 0 && newItemDescription.length > 0) {
			updateDoc(foodMenuRef, 'food', updatedMenu)
				.then(() => {
					toast.success('Updated Menu Item');
					setIsEditable(false);
				})
				.catch(() => {
					toast.error('Error updating Menu Item. Please try again.');
				});
		}
	};

	useEffect(() => {
		if (newItemTitle && newItemDescription) {
			setUpdatedItem({
				...updatedItem,
				name: newItemTitle,
				description: newItemDescription
			});
		}
	}, [newItemTitle, newItemDescription]);

	useEffect(() => {
		if (updatedItem) {
			const updatedItems: { name: string; description: string; price: string; order: number; img_url: string }[] = updatedMenu[categoryIndex].items.map(
				(foodItem, index) => {
					if (itemIndex !== index) {
						return foodItem;
					} else {
						return updatedItem;
					}
				}
			);

			const updatedState: IPreparedFoodMenuData = updatedMenu.map((category, index) => {
				if (index !== categoryIndex) {
					return category;
				} else {
					return {
						...category,
						items: updatedItems
					};
				}
			});

			setUpdatedMenu(updatedState);
		}
	}, [updatedItem]);

	return (
		<div className='relative w-[300px] transform rounded-xl border-1 border-solid border-gray-300 bg-white p-2 shadow-lg'>
			{isEditable ? (
				<>
					<div className='flex'>
						<div className='mx-auto flex h-[192px] w-[288px] rounded-xl bg-gray-400'>
							<span className='m-auto flex items-center font-bold text-gray-700'>
								<FaRegImage size='18px' />
								<p className='my-0 ml-2'> Select a new image</p>
							</span>
						</div>
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
						<div className='flex items-center space-x-4'>
							<button className='btn-outlined rounded-3xl normal-case' onClick={handleCancel}>
								Cancel
							</button>
							<button className='btn-primary rounded-3xl normal-case' onClick={handleSave}>
								Save
							</button>
						</div>
					</div>
				</>
			) : (
				<>
					<FaEdit className='absolute top-[-7px] right-[-10px] z-30 cursor-pointer bg-white' size='24px' onClick={() => setIsEditable(true)} />
					<div className='mx-auto rounded-xl object-cover'>
						<Image src='/imgs/food-image.jpeg' className='rounded-xl' width='288px' height='192px' />
					</div>
					<div className='p-2'>
						<h2 className='mb-2 text-lg font-bold'>{itemTitle}</h2>
						<p className='text-sm text-gray-600'>{itemDescription}</p>
					</div>
				</>
			)}
		</div>
	);
};

export default EditableMenuCard;
