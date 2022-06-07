import React, { useEffect, useState } from 'react';

import Divider from '@components/menu/divider.component';
import DividerLoader from '@components/menu/divider_loader.component';
import MenuCard from '@components/menu/menu_card.component';
import MenuLoaderCard from '@components/menu/menu_loader_card.component';

import PlaceholderMenuData from '@lib/data/placeholder_menu_data';
import { IPreparedFoodMenuData } from '@lib/types';
import { db } from '@lib/firebase.config';

import { doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';

const Menu: React.FC = () => {
	const [menuData, setMenuData] = useState<IPreparedFoodMenuData>();

	const [value, loading, error] = useDocument(doc(db, 'menu', 'z6Lx7enScX1qtiNo7jDe'));

	useEffect(() => {
		setMenuData(value?.data()?.food);
	}, [value]);

	return (
		<div className='relative bg-menu-background bg-cover bg-center bg-no-repeat p-4'>
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
										return <MenuCard key={`menu_item_${j}`} itemTitle={item.name} itemDescription={item.description} />;
									})}
								</div>
							</div>
						);
					})
				)}
			</div>
		</div>
	);
};

export default Menu;
