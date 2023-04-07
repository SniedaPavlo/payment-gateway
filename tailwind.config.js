/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: "jit",
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		xtend: {
			backgroundImage: {
				login: "url('/nord-building.png')",
			},
		},
	},
	plugins: [],
};
