import Image from 'next/image';
import React from 'react';

const Hero: React.FC = () => {
	return (
		<div className='relative flex h-[300px] w-screen flex-col bg-hero-pattern bg-cover bg-center bg-no-repeat text-white lg:h-[800px]'>
			<div className='absolute top-2 left-4 lg:left-6'>
				<div className='relative h-24 w-24 md:h-36 md:w-36 lg:h-48 lg:w-48'>
					<Image src='/imgs/FinnaEat-PrimaryLogo-White.jpg' className='rounded-full' layout='fill' objectFit='contain' />
				</div>
			</div>
			<h2 className='slogan m-auto text-4xl font-light italic md:text-5xl lg:text-6xl'>JUST GOOD FOOD</h2>
			<div className='absolute bottom-8 left-0 right-0 flex justify-center'>
				<button type='button' className='btn-primary'>
					Check out our menu!
				</button>
			</div>
		</div>
	);
};

export default Hero;
