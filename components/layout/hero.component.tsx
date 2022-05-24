import React from 'react';

const Hero: React.FC = () => {
	return (
		<div className='flex flex-col relative bg-hero-pattern bg-center bg-no-repeat bg-cover text-white h-[300px] lg:h-[800px] w-screen'>
			<img src='/imgs/logo.png' className='absolute h-24 lg:h-60 w-max top-2' />
			<h2 className='md:text-5xl lg:text-6xl text-4xl m-auto italic font-light slogan'>JUST GOOD FOOD</h2>
			<div className='flex justify-center absolute bottom-8 left-0 right-0'>
				<button type='button' className='btn-primary'>
					Check out our menu!
				</button>
			</div>
		</div>
	);
};

export default Hero;
