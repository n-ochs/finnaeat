import React from 'react';

interface IMenuCardProps {
	imgSrc?: string;
	itemTitle?: string;
	itemDescription?: string;
	itemPrice?: number;
}

const MenuCard: React.FC<IMenuCardProps> = () => {
	// Currently using stock image, title, & description
	return (
		<div className='w-64 p-2 border-1 border-gray-300 border-solid bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl'>
			<img className='h-40 w-60 object-cover rounded-xl mx-auto' src='/imgs/food-image.jpeg' alt='food' />
			<div className='p-2'>
				<h2 className='font-bold text-lg mb-2'>Bayou Broth</h2>
				<p className='text-sm text-gray-600'>Short ribs, shrimp, mussels, hot sausage and kimchi in a spicy asian broth over japanese noodles</p>
			</div>
		</div>
	);
};

export default MenuCard;
