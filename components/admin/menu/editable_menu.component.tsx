import React, { useEffect, useState } from 'react';

import Divider from '@components/menu/divider.component';
import DividerLoader from '@components/menu/divider_loader.component';
import EditableMenuCard from '@components/admin/menu/editable_menu_card.component';
import MenuLoaderCard from '@components/menu/menu_loader_card.component';
import NewMenuCard from '@components/admin/menu/new_menu_card.component';

import PlaceholderMenuData from '@lib/data/placeholder_menu_data';
import { INewMenuItem, IPreparedFoodMenuData } from '@lib/types';
import { foodMenuRef } from '@lib/firebase.config';

import toast from 'react-hot-toast';
import { FaPlusCircle } from 'react-icons/fa';
import { updateDoc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';

const EditableMenu: React.FC = () => {
	const [menuData, setMenuData] = useState<IPreparedFoodMenuData>();
	const [disabled, setDisabled] = useState<boolean>(false);

	const handleAdd: (i: number) => void = (i: number) => {
		if (disabled) {
			toast.error('Please finish with new item before adding another.');
			return;
		}
		const newMenuData: IPreparedFoodMenuData = menuData.map((item, index) => {
			if (i !== index) {
				return item;
			} else {
				item.items.push({ name: '', description: '', price: '', imgUrl: '' });
				return item;
			}
		});

		setMenuData(newMenuData);
	};

	const handleCancel: (i: number) => void = (i: number) => {
		const newMenuData: IPreparedFoodMenuData = menuData.map((item, index) => {
			if (i !== index) {
				return item;
			} else {
				item.items.pop();
				return item;
			}
		});

		setMenuData(newMenuData);
	};

	const handleSave: (i: number, newMenuItem: INewMenuItem) => void = (i: number, newMenuItem: INewMenuItem) => {
		if (newMenuItem.name.length === 0 && newMenuItem.description.length === 0) {
			toast.error('You must fill out at least name and description');
			return;
		}

		const newMenuData: IPreparedFoodMenuData = menuData.map((item, index) => {
			if (i !== index) {
				return item;
			} else {
				item.items.pop();
				item.items.push(newMenuItem);
				return item;
			}
		});

		updateDoc(foodMenuRef, 'food', newMenuData)
			.then(() => {
				toast.success('Added Menu Item');
				setMenuData(newMenuData);
			})
			.catch(() => {
				toast.error('Error updating Menu Item. Please try again.');
			});
	};

	const handleDelete: (i: number, menuItemIndex: number) => void = (i: number, menuItemIndex: number) => {
		const newMenuData: IPreparedFoodMenuData = menuData.map((item, index) => {
			if (i !== index) {
				return item;
			} else {
				item.items.splice(menuItemIndex, 1);
				return item;
			}
		});

		updateDoc(foodMenuRef, 'food', newMenuData)
			.then(() => {
				toast.success('Deleted Menu Item');
				setMenuData(newMenuData);
			})
			.catch(() => {
				toast.error('Error deleting Menu Item. Please try again.');
			});
	};

	const [value, loading, error] = useDocument(foodMenuRef);

	useEffect(() => {
		setMenuData(value?.data()?.food);
	}, [value]);

	useEffect(() => {
		// Checking to see if we have a new menu item in any of the items arrays. If there is, we need to disabled the edit and delete buttons to prevent any data errors
		if (menuData) {
			let errors: string[] = [];
			for (let i: number = 0; i < menuData?.length; i++) {
				if (menuData[i].items[menuData[i].items.length - 1].name === '' && menuData[i].items[menuData[i].items.length - 1].description === '') {
					errors.push('x');
				}
			}

			if (errors.length > 0) {
				setDisabled(true);
			} else {
				setDisabled(false);
			}
		}
	}, [menuData]);

	return (
		<div className='space-y-8'>
			<h2 className='text-center text-2xl underline'>Menu</h2>

			{loading ? (
				PlaceholderMenuData.food.map((placeholderCategory, i) => {
					return (
						<div key={`menu_category_loader_${i}`}>
							<DividerLoader />
							<div className='flex flex-wrap justify-center gap-4'>
								{placeholderCategory.items.map((_, j) => {
									return <MenuLoaderCard key={`menu_item_loader_${j}`} />;
								})}
							</div>
						</div>
					);
				})
			) : error ? (
				<div>Error</div>
			) : (
				menuData?.map((foodCategory, i) => {
					return (
						<div key={`menu_category_${i}`}>
							<Divider>{foodCategory.category}</Divider>
							<div className='flex flex-wrap justify-center gap-8'>
								{foodCategory.items.map((item, j) => {
									const categoryIndex: number = menuData?.indexOf(foodCategory);
									return (
										<React.Fragment key={`menu_${j}`}>
											{item.name === '' && item.description === '' && item.price === '' ? (
												<NewMenuCard index={i} handleCancel={handleCancel} handleSave={handleSave} />
											) : (
												<EditableMenuCard
													key={`menu_item_${j}`}
													itemTitle={item.name}
													itemDescription={item.description}
													itemPrice={item.price}
													itemIndex={j}
													categoryIndex={categoryIndex}
													menuData={menuData}
													disabled={disabled}
													handleDelete={handleDelete}
													setDisabled={setDisabled}
												/>
											)}
											{j === foodCategory.items.length - 1 && (
												<div className='flex min-h-[250px] w-[300px] transform rounded-xl border-1 border-solid border-gray-300 bg-white p-2 shadow-lg'>
													<div className='m-auto flex h-full w-full items-center justify-center rounded-xl bg-gray-300'>
														<FaPlusCircle size='28px' color='green' className='cursor-pointer' onClick={() => handleAdd(i)} />
													</div>
												</div>
											)}
										</React.Fragment>
									);
								})}
							</div>
						</div>
					);
				})
			)}
		</div>
	);
};

export default EditableMenu;
