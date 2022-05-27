import MenuData from 'lib/data/menu_data';
import React from 'react';
import Divider from './divider.component';
import MenuCard from './menu_card.component';

const Menu: React.FC = () => {
	return (
		<div className='relative bg-menu-background bg-cover bg-center bg-no-repeat p-4'>
			<div className='space-y-8'>
				{MenuData.food.map((category, i) => {
					return (
						<div key={`menu_category_${i}`}>
							<Divider>{category.title}</Divider>
							<div className='flex flex-wrap justify-center gap-4'>
								{category.items.map((item, j) => {
									return <MenuCard key={`menu_item_${j}`} itemTitle={item.name} itemDescription={item.description} />;
								})}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Menu;
