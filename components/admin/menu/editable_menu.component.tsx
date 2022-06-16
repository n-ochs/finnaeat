import React, { useEffect, useState } from 'react';

import DeleteModal from '@components/admin/menu/delete_modal.component';
import Divider from '@components/menu/divider.component';
import DividerLoader from '@components/menu/divider_loader.component';
import EditableMenuCard from '@components/admin/menu/editable_menu_card.component';
import MenuLoaderCard from '@components/menu/menu_loader_card.component';
import NewMenuCard from '@components/admin/menu/new_menu_card.component';

import PlaceholderMenuData from '@lib/data/placeholder_menu_data';
import { INewMenuItem, IPreparedFoodMenuData } from '@lib/types';
import { foodMenuRef, storage } from '@lib/firebase.config';

import toast from 'react-hot-toast';
import { FaPlusCircle } from 'react-icons/fa';
import { updateDoc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
import { StorageReference, deleteObject, ref } from 'firebase/storage';

const EditableMenu: React.FC = () => {
	const [menuData, setMenuData] = useState<IPreparedFoodMenuData>();
	const [disabled, setDisabled] = useState<boolean>(false);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [categoryToDelete, setCategoryToDelete] = useState<number>(null);

	const handleAdd: (i: number) => void = (i: number) => {
		if (disabled) {
			toast.error('Please finish with open task before starting another.');
			return;
		}
		const newMenuData: IPreparedFoodMenuData = menuData.map((item, index) => {
			if (i !== index) {
				return item;
			} else {
				item.items.push({ name: '', description: '', price: '', imgUrl: '', imgPath: '', isNewInd: true });
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
				const removeIsNewInd: { name: string; description: string; price: string; imgUrl: string; imgPath: string }[] = item.items.filter((e) => !e.isNewInd);
				item.items = removeIsNewInd;
				return item;
			}
		});

		setMenuData(newMenuData);
	};

	const handleSave: (i: number, newMenuItem: INewMenuItem) => void = (i: number, newMenuItem: INewMenuItem) => {
		if (newMenuItem.name.length === 0 || newMenuItem.description.length === 0 || newMenuItem.imgUrl.length === 0) {
			toast.error('Please fill out all fields.');
			return;
		}

		const newMenuData: IPreparedFoodMenuData = menuData.map((item, index) => {
			if (i !== index) {
				return item;
			} else {
				let removeIsNewInd: { name: string; description: string; price: string; imgUrl: string; imgPath: string }[] = item.items.filter((e) => !e.isNewInd);
				delete newMenuItem.isNewInd;
				removeIsNewInd.push(newMenuItem);
				item.items = removeIsNewInd;
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
		const imgRef: StorageReference = ref(storage, menuData[i].items[menuItemIndex].imgPath);
		deleteObject(imgRef)
			.then(() => {
				toast.success('Deleted item image from storage');
			})
			.catch(() => {
				toast.error('Error deleting item from storage.');
			});

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

	const handleAddCategory: () => void = () => {
		if (disabled) {
			toast.error('Please finish with open task before starting another.');
			return;
		}
		const newMenuData: IPreparedFoodMenuData = menuData.map((item) => {
			return item;
		});

		newMenuData.push({ category: 'New Category', items: [{ name: '', description: '', imgUrl: '', price: '', imgPath: '', isNewInd: true }] });

		setMenuData(newMenuData);
	};

	const handleEditCategory: (categoryIndex: number, updatedCategoryTitle: string) => void = (categoryIndex: number, updatedCategoryTitle: string) => {
		const newMenuData: IPreparedFoodMenuData = menuData.map((item, index) => {
			if (categoryIndex !== index) {
				return item;
			} else {
				item.category = updatedCategoryTitle;
				return item;
			}
		});

		updateDoc(foodMenuRef, 'food', newMenuData)
			.then(() => {
				toast.success('Changed category title');
				setMenuData(newMenuData);
			})
			.catch(() => {
				toast.error('Error updating category. Please try again.');
			});
	};

	const handleDeleteCategory: (index: number) => void = (index: number) => {
		const newMenuData: IPreparedFoodMenuData = menuData.map((item) => {
			return item;
		});

		let imgPaths: { imgPath: string; itemName: string }[] = [];

		newMenuData[index].items.forEach((item) => imgPaths.push({ imgPath: item.imgPath, itemName: item.name }));

		imgPaths.forEach((img) => {
			const imgRef: StorageReference = ref(storage, img.imgPath);
			deleteObject(imgRef)
				.then(() => {
					toast.success(`Deleted ${img.itemName} image from storage`);
				})
				.catch(() => {
					toast.error(`Error deleting ${img.itemName} image from storage`);
				});
		});

		newMenuData.splice(index, 1);

		updateDoc(foodMenuRef, 'food', newMenuData)
			.then(() => {
				toast.success('Deleted Menu Category');
				setMenuData(newMenuData);
			})
			.catch(() => {
				toast.error('Error deleting Menu Category. Please try again.');
			});

		setCategoryToDelete(null);
		setIsModalOpen(false);
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
				if (
					menuData[i].items.length > 0 &&
					menuData[i].items[menuData[i].items.length - 1].name === '' &&
					menuData[i].items[menuData[i].items.length - 1].description === ''
				) {
					errors.push('.');
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
		<>
			{isModalOpen && <DeleteModal categoryToDelete={categoryToDelete} cancelFn={setIsModalOpen} confirmFn={handleDeleteCategory} />}
			<div className='space-y-24'>
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
							<div key={`menu_category_${i}`} className='space-y-8'>
								<Divider editable handleEditCategory={handleEditCategory} index={i}>
									<span className='text-2xl'>{foodCategory.category}</span>
								</Divider>
								<div className='flex flex-wrap justify-center gap-8'>
									{foodCategory.items.map((item, j) => {
										const oneRemaining: boolean = foodCategory.items.length === 1 ? true : false;
										return (
											<React.Fragment key={`menu_${j}`}>
												{item.isNewInd ? (
													<NewMenuCard index={i} foodCategory={foodCategory.category} handleCancel={handleCancel} handleSave={handleSave} />
												) : (
													<EditableMenuCard
														key={`menu_item_${j}`}
														itemTitle={item.name}
														itemDescription={item.description}
														itemPrice={item.price}
														imgSrc={item.imgUrl}
														imgPath={item.imgPath}
														itemIndex={j}
														categoryIndex={i}
														menuData={menuData}
														disabled={disabled}
														oneRemaining={oneRemaining}
														handleDelete={handleDelete}
														setDisabled={setDisabled}
													/>
												)}
												{(j === foodCategory.items.length - 1 || foodCategory.category === 'New Category') && (
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
								<div className='flex items-center justify-center'>
									<button
										disabled={disabled}
										className='btn-primary rounded-3xl normal-case'
										onClick={() => {
											setIsModalOpen(true);
											setCategoryToDelete(i);
										}}
									>
										Delete Category
									</button>
								</div>
							</div>
						);
					})
				)}
				<div className='flex items-center justify-center'>
					<button className='btn-primary rounded-3xl normal-case' onClick={handleAddCategory}>
						New Category
					</button>
				</div>
			</div>
		</>
	);
};

export default EditableMenu;
