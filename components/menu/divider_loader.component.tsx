import React from 'react';

const DividerLoader: React.FC = () => {
	return (
		<div className='mb-4 flex items-center'>
			<div className='h-[2px] flex-1 rounded-xl bg-black'></div>
			<div className='my-0 mx-4 rounded-[50px] border-2 border-solid border-black bg-white py-4 px-8'>
				<div className='m-0 h-[24px] w-[70px] animate-pulse rounded-xl bg-gray-400' />
			</div>
			<div className='h-[2px] flex-1 rounded-xl bg-black'></div>
		</div>
	);
};

export default DividerLoader;
