import React, { useRef, useState } from 'react';
import { StorageReference, UploadTask, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '@lib/firebase.config';
import { FaRegImage } from 'react-icons/fa';

interface IImageUploaderProps {
	isNewItem: boolean;
	setNewItemImgUrl?: React.Dispatch<React.SetStateAction<string>>;
	setUpdatedItemImgUrl?: React.Dispatch<React.SetStateAction<string>>;
}

const ImageUploader: React.FC<IImageUploaderProps> = ({ isNewItem, setNewItemImgUrl, setUpdatedItemImgUrl }) => {
	const hiddenFileInput: React.MutableRefObject<HTMLInputElement> = useRef();
	const [uploading, setUploading] = useState<boolean>(false);
	const [progress, setProgress] = useState<number>(0);
	const [uploadComplete, setUploadComplete] = useState<boolean>(false);

	const handleBtnClick: () => void = () => {
		hiddenFileInput.current.click();
	};

	// Creates a Firebase Upload Task
	const uploadFile: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void> = async (e: React.ChangeEvent<HTMLInputElement>) => {
		// Get the file
		const file: File = Array.from(e.target.files)[0];
		const extension: string = file.type.split('/')[1];

		// Makes reference to the storage bucket location
		const fileRef: StorageReference = ref(storage, `uploads/${Date.now()}.${extension}`);
		setUploading(true);

		// Starts the upload
		const task: UploadTask = uploadBytesResumable(fileRef, file);

		// Listen to updates to upload task
		task.on('state_changed', (snapshot) => {
			const pct: number = Number(((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0));
			setProgress(pct);
		});

		// Get downloadURL AFTER task resolves (Note: not a native Promise)
		task.then(() => getDownloadURL(fileRef)).then((url: string) => {
			setUploadComplete(true);
			if (isNewItem) {
				setNewItemImgUrl(url);
			} else {
				setUpdatedItemImgUrl(url);
			}
			setUploading(false);
		});
	};

	return (
		<div className='flex'>
			<div className='mx-auto flex h-[192px] w-[288px] rounded-xl bg-gray-400'>
				<span className='container m-auto flex flex-col font-bold text-gray-700'>
					{uploading ? (
						<progress value={progress} max='100' className='mx-auto'>
							{progress}%
						</progress>
					) : uploadComplete ? (
						<p className='my-0 text-center'>Upload Complete!</p>
					) : (
						<>
							<button className='mx-auto inline-flex items-center' onClick={handleBtnClick}>
								<FaRegImage size='18px' />
								<span className='my-0 ml-2'>Upload Image</span>
							</button>
							<input ref={hiddenFileInput} type='file' className='hidden' onChange={uploadFile} accept='image/x-png,image/gif,image/jpeg' />
						</>
					)}
				</span>
			</div>
		</div>
	);
};

export default ImageUploader;
