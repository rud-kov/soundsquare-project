/** @type {import('tailwindcss').Config} */

const rem = (px) => ({ [px]: `${px / 16}rem` });

let colors = {
	blue: "#00a3ff",
	green: "#00ff00",
	black: "#000000",
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
				inter: ["'Inter'"],
				public: ["'Public Sans'"],
			},
			fontSize: {
				...rem(16),
				...rem(24),
				...rem(32),
				...rem(48),
			},
			borderWidth: {
				DEFAULT: "1px",
			},
			lineHeight: {
				11: "3.525rem",
			},
			content: {
				soundsquare__logo: 'url("/src/img/soundsquare__logo.svg")',
				soundsquare__logo__small: 'url("/src/img/soundsquare__logo--mobile.svg")',
				dolby__logo: 'url("/src/img/dolby.png")',
			},
			width: {
				fixedBttn: "20.875rem",
			},
			backgroundImage: {
				"login-lock": "url('/src/img/lock__icon--login.svg')",
				"mail-icon": "url('/src/img/mail__icon.svg')",
			},
		},
	},
	plugins: [],
};
