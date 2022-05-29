import Link from 'next/link';
import React from 'react';
import { FaFacebookSquare, FaInstagram, FaTiktok } from 'react-icons/fa';
import { BsTelephone } from 'react-icons/bs';
import { AiOutlineMail } from 'react-icons/ai';

const Footer: React.FC = () => {
	return (
		<footer className='w-screen bg-primaryBrown p-4'>
			<div className='space-y-2'>
				<div className='flex items-center justify-center space-x-8'>
					<Link href='https://www.facebook.com/Finna-Eat-109601537220056/' className='rounded-md p-2 hover:bg-footerButtonHover'>
						<a>
							<FaFacebookSquare size='35px' color='#C41D33' />
						</a>
					</Link>
					<Link href='https://www.instagram.com/finnaeatfoods/' className='rounded-md p-2 hover:bg-footerButtonHover'>
						<a>
							<FaInstagram size='35px' color='#C41D33' />
						</a>
					</Link>
					<Link href='https://www.tiktok.com/@finnaeatllc?' className='rounded-md p-2 hover:bg-footerButtonHover'>
						<a>
							<FaTiktok size='35px' color='#C41D33' />
						</a>
					</Link>
				</div>
				<div className='flex items-center justify-center space-x-8'>
					<a className='flex items-center text-white' href='tel:504-215-3686'>
						<BsTelephone className='mr-2' size='18px' />
						504-215-3686
					</a>
					<a className='flex items-center text-white' href='mailto:finnaeatfoods@gmail.com'>
						<AiOutlineMail className='mr-2' size='18px' />
						finnaeatfoods@gmail.com
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
