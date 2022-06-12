import React, { useEffect, useState } from 'react';

import { foodMenuRef } from '@lib/firebase.config';
import { IPreparedFoodMenuData } from '@lib/types';

import { useDocument } from 'react-firebase-hooks/firestore';
import Divider from '@components/menu/divider.component';
import EditableMenuCard from './editable_menu_card.component';
import DividerLoader from '@components/menu/divider_loader.component';
import MenuLoaderCard from '@components/menu/menu_loader_card.component';
import PlaceholderMenuData from '@lib/data/placeholder_menu_data';

const EditableMenu: React.FC = () => {
	const [menuData, setMenuData] = useState<IPreparedFoodMenuData>();

	const [value, loading, error] = useDocument(foodMenuRef);

	useEffect(() => {
		setMenuData(value?.data()?.food);
	}, [value]);

	return (
		<div className='space-y-8'>
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
							<div className='flex flex-wrap justify-center gap-4'>
								{foodCategory.items.map((item, j) => {
									const categoryIndex: number = menuData?.indexOf(foodCategory);
									return (
										<EditableMenuCard
											key={`menu_item_${j}`}
											itemTitle={item.name}
											itemDescription={item.description}
											itemIndex={j}
											categoryIndex={categoryIndex}
											menuData={menuData}
										/>
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
