/* eslint-disable max-len */
import React from 'react';

interface IDeleteModalProps {
	categoryToDelete: number;
	cancelFn: React.Dispatch<React.SetStateAction<boolean>>;
	confirmFn: (index: number) => void;
}

const DeleteModal: React.FC<IDeleteModalProps> = ({ categoryToDelete, cancelFn, confirmFn }) => {
	return (
		<>
			<div className='absolute inset-0 z-40 flex h-screen w-screen items-center justify-center bg-black opacity-90' />
			<div className='absolute top-[50%] left-[50%] z-50 flex w-[380px] translate-x-[-50%] translate-y-[-50%] flex-col items-center justify-center space-y-4 rounded-lg border-1 border-solid border-gray-400 bg-white p-4'>
				<p className='my-0 text-center'>Are you sure you want to delete this category? This action is cannot be reversed.</p>
				<div className='flex items-center space-x-3'>
					<button className='btn-outlined rounded-3xl normal-case' onClick={() => cancelFn(false)}>
						Cancel
					</button>
					<button className='btn-primary rounded-3xl normal-case' onClick={() => confirmFn(categoryToDelete)}>
						Delete
					</button>
				</div>
			</div>
		</>
	);
};

export default DeleteModal;
