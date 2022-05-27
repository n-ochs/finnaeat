import React from 'react';

interface IDividerProps {
	children: React.ReactNode;
}

const Divider: React.FC<IDividerProps> = ({ children }) => {
	return (
		<div className='mb-4 flex items-center'>
			<div className='h-[2px] flex-1 rounded-xl bg-black'></div>
			<p className='my-0 mx-4 rounded-[50px] border-2 border-solid border-black bg-white py-4 px-8'>{children}</p>
			<div className='h-[2px] flex-1 rounded-xl bg-black'></div>
		</div>
	);
};

export default Divider;
