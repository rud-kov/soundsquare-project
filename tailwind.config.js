/** @type {import('tailwindcss').Config} */

const rem = (px) => ({ [px]: `${px / 16}rem` });

let colors = {
	blue: "#00a3ff",
	green: "#00ff00",
	black: "#000000",
	darkInput: "#C3C3C3",
};

module.exports = {
	content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
	darkMode: "selector",
	theme: {
		extend: {
			colors: colors,
			backgroundImage: ["dark"],
			screens: {
				mdd: { max: "767px" },
				tablet: { min: "768px", max: "1023px" },
				lgd: { max: "1023px" },
				xl: { max: "1279px" },
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
				soundsquare__logo__small:
					'url("/src/img/soundsquare__logo--mobile.svg")',
				dolby__logo: 'url("/src/img/dolby.png")',
			},
			width: {
				fixedBttn: "20.875rem",
			},
			maxWidth: {
				fullWidth: "27.125rem",
				mobileWidth: "14.46rem",
			},
			backgroundColor: {
				darkPrimary: "#353535",
				darkSecondary: "#000",
				darkThird: "#303030",
				darkFourth: "#C3C3C3",
				darkFive: "#202020",
				lightPrimary: "#ECECEC",
				lightSecondary: "#DADADA",
				lightThird: "#D9D9D9",
				lightFourth: "#161616",
				lightFive: "hsl(180, 40%, 100%)",
			},
			textColor: {
				lightFont: "#161616",
				darkFont: "#C3C3C3",
			},
			borderColor: {
				lightBorder: "#161616",
				darkBorder: "#C3C3C3",
			},
		},
	},
	plugins: [],
};
