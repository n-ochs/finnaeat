import React, { useState } from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';
import { FcCancel } from 'react-icons/fc';

import { FaEdit } from 'react-icons/fa';

interface IDividerProps {
	children: React.ReactNode;
	editable?: boolean;
	index?: number;
	handleEditCategory?: (categoryIndex: number, updatedCategoryTitle: string) => void;
}

const Divider: React.FC<IDividerProps> = ({ children, editable, index, handleEditCategory }) => {
	const [editCategory, setEditCategory] = useState<boolean>(false);
	const [newCategoryTitle, setNewCategoryTitle] = useState<string>('');

	return (
		<div className='mb-4 flex items-center'>
			<div className='h-[2px] flex-1 rounded-xl bg-black'></div>
			<p className='relative my-0 mx-4 rounded-[50px] border-2 border-solid border-black bg-white py-4 px-8'>
				{editCategory ? <input type='text' className='px-2' autoFocus value={newCategoryTitle} onChange={(e) => setNewCategoryTitle(e.target.value)} /> : children}
				{editable ? (
					!editCategory ? (
						<FaEdit
							className='absolute top-[-7px] right-[-5px] z-30 cursor-pointer bg-white'
							size='24px'
							onClick={() => {
								setEditCategory(true);
							}}
						/>
					) : (
						<>
							<BsCheckCircleFill
								className='absolute top-[-7px] right-[-4px] z-30 cursor-pointer bg-white'
								color='green'
								size='24px'
								onClick={() => {
									handleEditCategory(index, newCategoryTitle);
									setEditCategory(false);
								}}
							/>
							<FcCancel
								color='red'
								size='28px'
								className='absolute top-[-8px] left-[-2px] z-30 cursor-pointer bg-white'
								onClick={() => setEditCategory(false)}
							/>
						</>
					)
				) : null}
			</p>
			<div className='h-[2px] flex-1 rounded-xl bg-black'></div>
		</div>
	);
};

export default Divider;
