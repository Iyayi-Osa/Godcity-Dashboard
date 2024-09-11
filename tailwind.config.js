/** @type {import('tailwindcss').Config} */
module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: "class", // or 'media' or 'class'
	theme: {
		extend: {
			animation: {
				blob: "blob 7s infinite",
			},
			colors: {
				gold: {
					50: "#f2e8b6",
					100: "#ebde8f",
					200: "#e4d468",
					300: "#ddca40",
					400: "#d6c01c",
					500: "#c0a700", // Base Gold color
					600: "#a28900",
					700: "#846b00",
					800: "#655000",
					900: "#463500",
					DEFAULT: "#c0a700", // Gold
				},
			},
			keyframes: {
				blob: {
					"0%": {
						transform: "translate(0px, 0px) scale(1)",
					},
					"33%": {
						transform: "translate(30px, -50px) scale(1.1)",
					},
					"66%": {
						transform: "translate(-20px, 20px) scale(0.9)",
					},
					"100%": {
						transform: "translate(0px, 0px) scale(1)",
					},
				},
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
