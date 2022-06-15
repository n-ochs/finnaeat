import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import ImageUploader from '@components/admin/menu/image_uploader.component';

import { IMenuCardProps, IPreparedFoodMenuData } from '@lib/types';
import { foodMenuRef } from '@lib/firebase.config';

import toast from 'react-hot-toast';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import { updateDoc } from 'firebase/firestore';

interface IEditableMenuCardProps extends IMenuCardProps {
	itemIndex: number;
	categoryIndex: number;
	menuData: IPreparedFoodMenuData;
	disabled: boolean;
	oneRemaining: boolean;
	handleDelete: (i: number, menuItemIndex: number) => void;
	setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditableMenuCard: React.FC<IEditableMenuCardProps> = ({
	itemTitle,
	itemDescription,
	itemPrice,
	imgSrc,
	imgPath,
	itemIndex,
	categoryIndex,
	menuData,
	disabled,
	oneRemaining,
	handleDelete,
	setDisabled
}) => {
	const [isEditable, setIsEditable] = useState<boolean>(false);
	const [updatedItemTitle, setUpdatedItemTitle] = useState<string>(itemTitle);
	const [updatedItemDescription, setUpdatedItemDescription] = useState<string>(itemDescription);
	const [updatedItemPrice, setUpdatedItemPrice] = useState<string>(itemPrice);
	const [updatedItemImgUrl, setUpdatedItemImgUrl] = useState<string>(imgSrc);
	const [updatedItemImgPath, setUpdatedItemImgPath] = useState<string>(imgPath);
	const [updatedItem, setUpdatedItem] = useState<{ name: string; description: string; price: string; imgUrl: string; imgPath: string }>();
	const [updatedMenu, setUpdatedMenu] = useState<IPreparedFoodMenuData>(menuData);
	const [isReadyForDelete, setIsReadyForDelete] = useState<boolean>(false);

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
			name: updatedItemTitle,
			description: updatedItemDescription,
			price: updatedItemPrice,
			imgUrl: updatedItemImgUrl,
			imgPath: updatedItemImgPath
		});
	}, [updatedItemTitle, updatedItemDescription, updatedItemPrice, updatedItemImgUrl, updatedItemImgPath]);

	useEffect(() => {
		if (updatedItem) {
			const updatedItems: { name: string; description: string; price: string; imgUrl: string; imgPath: string }[] = updatedMenu[categoryIndex].items.map(
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

	useEffect(() => {
		setUpdatedMenu(menuData);
	}, [menuData]);

	useEffect(() => {
		if (isEditable) {
			setDisabled(true);
		} else setDisabled(false);
	}, [isEditable]);

	return (
		<div className='relative w-[300px] transform rounded-xl border-1 border-solid border-gray-300 bg-white p-2 shadow-lg'>
			{isEditable ? (
				<>
					<ImageUploader isNewItem={false} setUpdatedItemImgUrl={setUpdatedItemImgUrl} setUpdatedItemImgPath={setUpdatedItemImgPath} />
					<div className='space-y-2 p-2'>
						<input
							type='text'
							value={updatedItemTitle}
							onChange={(e) => setUpdatedItemTitle(e.target.value)}
							placeholder={itemTitle}
							className='w-full rounded-md border-1 border-solid border-gray-400 px-2 py-1'
						/>
						<textarea
							className='container rounded-md border-1 border-solid border-gray-400 px-2 py-1 text-sm text-gray-600'
							rows={4}
							cols={50}
							placeholder={itemDescription}
							value={updatedItemDescription}
							onChange={(e) => setUpdatedItemDescription(e.target.value)}
						/>
						<input
							type='text'
							value={updatedItemPrice}
							onChange={(e) => setUpdatedItemPrice(e.target.value)}
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
			) : isReadyForDelete ? (
				<div className='container flex h-full flex-col'>
					<div className='m-auto flex flex-col space-y-6'>
						<p className='text-center text-gray-600'>
							Are you sure you want to delete:
							<br />
							<strong>{itemTitle}</strong>
						</p>
						<div className='mx-auto space-x-4'>
							<button className='btn-outlined rounded-3xl normal-case' onClick={() => setIsReadyForDelete(false)}>
								Cancel
							</button>
							<button className='btn-primary rounded-3xl normal-case' onClick={() => handleDelete(categoryIndex, itemIndex)}>
								Delete
							</button>
						</div>
					</div>
				</div>
			) : (
				<>
					{!oneRemaining && (
						<AiOutlineMinusCircle
							color='red'
							size='24px'
							className={disabled ? 'hidden' : 'absolute top-[-10px] left-[-10px] z-30 cursor-pointer rounded-md bg-white'}
							onClick={() => setIsReadyForDelete(true)}
						/>
					)}
					<FaEdit
						className={disabled ? 'hidden' : 'absolute top-[-7px] right-[-10px] z-30 cursor-pointer rounded-md bg-white'}
						size='24px'
						onClick={() => setIsEditable(true)}
					/>
					<div className='mx-auto rounded-xl object-cover'>
						<Image src={imgSrc === '' || imgSrc === null ? '/imgs/food-image.jpeg' : imgSrc} className='rounded-xl' width='288px' height='216px' />
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
