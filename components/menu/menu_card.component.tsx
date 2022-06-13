import React from 'react';
import Image from 'next/image';

import { IMenuCardProps } from '@lib/types';

const MenuCard: React.FC<IMenuCardProps> = ({ itemTitle, itemDescription, itemPrice }) => {
	return (
		<div className='relative w-[300px] transform rounded-xl border-1 border-solid border-gray-300 bg-white p-2 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl'>
			<div className='mx-auto rounded-xl object-cover'>
				<Image src='/imgs/food-image.jpeg' className='rounded-xl' width='288px' height='192px' />
			</div>
			<div className='p-2'>
				<h2 className='mb-2 text-lg font-bold'>{itemTitle}</h2>
				<p className={itemPrice ? 'mb-8 text-sm text-gray-600' : 'text-sm text-gray-600'}>{itemDescription}</p>
			</div>
			{itemPrice && <p className='absolute right-3 bottom-3 rounded-lg border-1 border-solid border-gray-400 p-1 text-sm text-gray-600 shadow-lg'>${itemPrice}</p>}
		</div>
	);
};

export default MenuCard;
