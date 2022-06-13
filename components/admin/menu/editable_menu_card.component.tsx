import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { IMenuCardProps, IPreparedFoodMenuData } from '@lib/types';
import { foodMenuRef } from '@lib/firebase.config';

import toast from 'react-hot-toast';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { FaEdit, FaRegImage } from 'react-icons/fa';
import { updateDoc } from 'firebase/firestore';

interface IEditableMenuCardProps extends IMenuCardProps {
	itemIndex: number;
	categoryIndex: number;
	menuData: IPreparedFoodMenuData;
}

const EditableMenuCard: React.FC<IEditableMenuCardProps> = ({ itemTitle, itemDescription, itemPrice, itemIndex, categoryIndex, menuData }) => {
	const [isEditable, setIsEditable] = useState<boolean>(false);
	const [newItemTitle, setNewItemTitle] = useState<string>(itemTitle);
	const [newItemDescription, setNewItemDescription] = useState<string>(itemDescription);
	const [newItemPrice, setNewItemPrice] = useState<string>(itemPrice);
	const [updatedItem, setUpdatedItem] = useState<{ name: string; description: string; price: string; imgUrl: string }>();
	const [updatedMenu, setUpdatedMenu] = useState<IPreparedFoodMenuData>(menuData);

	const handleCancel: () => void = () => {
		setIsEditable(false);
	};

	const handleSave: () => void = () => {
		updateDoc(foodMenuRef, 'food', updatedMenu)
			.then(() => {
				toast.success('Updated Menu Item');
				setIsEditable(false);
			})
			.catch(() => {
				toast.error('Error updating Menu Item. Please try again.');
			});
	};

	useEffect(() => {
		setUpdatedItem({
			...updatedItem,
			name: newItemTitle,
			description: newItemDescription,
			price: newItemPrice
		});
	}, [newItemTitle, newItemDescription, newItemPrice]);

	useEffect(() => {
		if (updatedItem) {
			const updatedItems: { name: string; description: string; price: string; imgUrl: string }[] = updatedMenu[categoryIndex].items.map((foodItem, index) => {
				if (itemIndex !== index) {
					return foodItem;
				} else {
					return updatedItem;
				}
			});

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

	useEffect(() => {
		setUpdatedMenu(menuData);
	}, [menuData]);

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
							placeholder={itemTitle}
							className='w-full rounded-md border-1 border-solid border-gray-400 px-2 py-1'
						/>
						<textarea
							className='container rounded-md border-1 border-solid border-gray-400 px-2 py-1 text-sm text-gray-600'
							rows={4}
							cols={50}
							placeholder={itemDescription}
							value={newItemDescription}
							onChange={(e) => setNewItemDescription(e.target.value)}
						/>
						<input
							type='text'
							value={newItemPrice}
							onChange={(e) => setNewItemPrice(e.target.value)}
							placeholder={itemPrice ? itemPrice : 'Item Price (optional)'}
							className='mt-0 w-full rounded-md border-1 border-solid border-gray-400 px-2 py-1 text-sm'
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
					<AiOutlineMinusCircle color='red' size='24px' className='absolute top-[-10px] left-[-10px] z-30 cursor-pointer bg-white' />
					<FaEdit className='absolute top-[-7px] right-[-10px] z-30 cursor-pointer bg-white' size='24px' onClick={() => setIsEditable(true)} />
					<div className='mx-auto rounded-xl object-cover'>
						<Image src='/imgs/food-image.jpeg' className='rounded-xl' width='288px' height='192px' />
					</div>
					<div className='p-2'>
						<h2 className='mb-2 text-lg font-bold'>{itemTitle}</h2>
						<p className={itemPrice ? 'mb-8 text-sm text-gray-600' : 'text-sm text-gray-600'}>{itemDescription}</p>
					</div>
					{itemPrice && (
						<p className='absolute right-3 bottom-3 rounded-lg border-1 border-solid border-gray-400 p-1 text-sm text-gray-600 shadow-lg'>${itemPrice}</p>
					)}
				</>
			)}
		</div>
	);
};

export default EditableMenuCard;
