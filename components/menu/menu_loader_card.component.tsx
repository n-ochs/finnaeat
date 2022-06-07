import React from 'react';

const MenuLoaderCard: React.FC = () => {
	return (
		<div className='w-[300px] rounded-xl border-1 border-solid border-gray-300 bg-white p-2 shadow-lg'>
			<div className='mx-auto mb-2 h-[188px] w-[282px] animate-pulse rounded-xl bg-gray-400 object-cover' />
			<div className='flex flex-col p-2'>
				<div className='mb-2 h-4 w-16 animate-pulse rounded-xl bg-gray-400' />
				<div className='mb-1 h-2 w-full animate-pulse rounded bg-gray-400' />
				<div className='mb-1 h-2 w-full animate-pulse rounded bg-gray-400' />
				<div className='mb-1 h-2 w-full animate-pulse rounded bg-gray-400' />
				<div className='mb-1 h-2 w-full animate-pulse rounded bg-gray-400' />
			</div>
		</div>
	);
};

export default MenuLoaderCard;
