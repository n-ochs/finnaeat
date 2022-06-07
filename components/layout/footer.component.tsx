import React from 'react';
import Link from 'next/link';

import { AiOutlineMail } from 'react-icons/ai';
import { BsTelephone } from 'react-icons/bs';
import { FaFacebookSquare, FaInstagram, FaTiktok } from 'react-icons/fa';

const Footer: React.FC = () => {
	return (
		<footer className='w-screen bg-primaryBrown p-4'>
			<div className='space-y-3'>
				{/* Social Links */}
				<div className='flex items-center justify-center space-x-4'>
					<div className='rounded-md p-2 hover:bg-footerButtonHover'>
						<Link href='https://www.facebook.com/Finna-Eat-109601537220056/'>
							<a>
								<FaFacebookSquare size='35px' color='#C41D33' />
							</a>
						</Link>
					</div>
					<div className='rounded-md p-2 hover:bg-footerButtonHover'>
						<Link href='https://www.instagram.com/finnaeatfoods/' className='rounded-md p-2 hover:bg-footerButtonHover'>
							<a>
								<FaInstagram size='35px' color='#C41D33' />
							</a>
						</Link>
					</div>
					<div className='rounded-md p-2 hover:bg-footerButtonHover'>
						<Link href='https://www.tiktok.com/@finnaeatllc?' className='rounded-md p-2 hover:bg-footerButtonHover'>
							<a>
								<FaTiktok size='35px' color='#C41D33' />
							</a>
						</Link>
					</div>
				</div>

				{/* Contact Information */}
				<div className='flex flex-col items-center justify-center'>
					<a className='flex items-center text-white' href='tel:504-215-3686'>
						<BsTelephone className='mr-2' size='18px' />
						504-215-3686
					</a>
					<a className='flex items-center text-white' href='mailto:finnaeatfoods@gmail.com'>
						<AiOutlineMail className='mr-2' size='18px' />
						finnaeatfoods@gmail.com
					</a>
				</div>

				{/* Admin Route */}
				<div className='flex items-center justify-center'>
					<Link href='#'>
						<a className='btn-primary rounded-2xl bg-primaryRed px-4 py-1 normal-case text-white'>Admin</a>
					</Link>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
