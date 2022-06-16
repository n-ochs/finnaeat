import React from 'react';
import Image from 'next/image';
import { NextRouter, useRouter } from 'next/router';

import { scroller } from 'react-scroll';

const Hero: React.FC = () => {
	const router: NextRouter = useRouter();

	// function does not work if there is CSS 'overflow' anywhere
	const scrollToMenu: () => void = async () => {
		if (router.pathname === '/') {
			scroller.scrollTo('Menu', {
				delay: 100,
				smooth: true
			});
		} else {
			await router.push('/').then(() => {
				scroller.scrollTo('Menu', {
					delay: 100,
					smooth: true
				});
			});
		}
	};

	return (
		<div className='relative flex h-[300px] flex-col bg-hero-pattern bg-cover bg-center bg-no-repeat text-white lg:h-[800px]'>
			<div className='absolute top-2 left-4 lg:left-6'>
				<div className='relative h-24 w-24 sm:h-24 sm:w-24 md:h-36 md:w-36 lg:h-48 lg:w-48'>
					<Image src='/imgs/FinnaEat-Small-PrimaryLogo-transparent.jpg' className='rounded-full' layout='fill' objectFit='contain' />
				</div>
			</div>
			<h2 className='slogan m-auto text-4xl font-light italic md:text-5xl lg:text-6xl'>JUST GOOD FOOD</h2>
			<div className='absolute bottom-8 left-0 right-0 flex justify-center'>
				<button type='button' className='btn-primary mr-2 rounded-3xl' onClick={scrollToMenu}>
					Check out our menu!
				</button>
			</div>
		</div>
	);
};

export default Hero;
