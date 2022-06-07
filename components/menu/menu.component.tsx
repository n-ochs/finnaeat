import React, { useEffect, useState } from 'react';
import MenuCard from '@components/menu/menu_card.component';
import { collection, getFirestore } from 'firebase/firestore';
import { firebaseApp } from '@lib/firebase.config';
import { useCollection } from 'react-firebase-hooks/firestore';
import DividerLoader from './divider_loader.component';
import PlaceholderMenuData from '@lib/data/placeholder_menu_data';
import MenuLoaderCard from './menu_loader_card.component';
import Divider from './divider.component';
import { IMenuCategory, IPreparedMenuData, IRawMenuData } from '@lib/types';

const Menu: React.FC = () => {
	const [value, loading, error] = useCollection(collection(getFirestore(firebaseApp), 'menu'));
	const [menuData, setMenuData] = useState<IPreparedMenuData>();

	useEffect(() => {
		const rawMenuData: IRawMenuData = value?.docs?.map((doc) => doc.data());
		const rawCategories: string[] = rawMenuData?.map((menuItem) => menuItem.category);
		const rawUniqueCategories: string[] = rawCategories?.filter((item, pos) => {
			return rawCategories.indexOf(item) === pos;
		});

		const preparedMenuData: IPreparedMenuData = rawUniqueCategories?.map((item) => {
			const categoryItemMatch: { name?: string; description?: string; price?: string; order?: number; img_url?: string }[] = rawMenuData?.filter(
				(e) => e.category === item
			);
			return { category: item, items: categoryItemMatch };
		});

		setMenuData(preparedMenuData);
	}, [loading]);

	return (
		<div className='relative bg-menu-background bg-cover bg-center bg-no-repeat p-4'>
			<div className='space-y-8'>
				{loading ? (
					PlaceholderMenuData.food.map((category: IMenuCategory, i: number) => {
						return (
							<div key={`menu_category_loader_${i}`}>
								<DividerLoader />
								<div className='flex flex-wrap justify-center gap-4'>
									{category.items.map((_, j) => {
										return <MenuLoaderCard key={`menu_item_loader_${j}`} />;
									})}
								</div>
							</div>
						);
					})
				) : error ? (
					<div>Error</div>
				) : (
					menuData?.map((category, i) => {
						return (
							<div key={`menu_category_${i}`}>
								<Divider>{category.category}</Divider>
								<div className='flex flex-wrap justify-center gap-4'>
									{category.items.map((item, j) => {
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
