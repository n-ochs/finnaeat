/* eslint-disable */
module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primaryRed: '#C41D33',
				primaryRedHover: '#b01a2e',
				primaryRedActive: '#891424',
				primaryBrown: '#1e1415'
			},
			borderWidth: {
				1: '1px'
			},
			width: {
				64: '16rem'
			},
			backgroundImage: {
				'hero-pattern': "url('/imgs/hero.png')"
			}
		}
	},
	plugins: []
};
