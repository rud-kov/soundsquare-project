/** @type {import('tailwindcss').Config} */

const rem = (px) => ({ [px]: `${px / 16}rem` });

let colors = {
	blue: "#00a3ff",
};

module.exports = {
	content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: colors,
			screens: {
				mdd: { max: "767px" },
				tablet: { min: "768px", max: "1023px" },
				lgd: { max: "1023px" },
			},
			fontFamily: {
				sans: ["'Roboto'", "sans-serif"],
				serif: ["'Apple Garamond'", "serif"],
			},
			fontSize: {
				...rem(16),
				...rem(32),
			},
		},
	},
	plugins: [],
};
