module.exports = {
	mode: "jit",
	purge: ["./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class", // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				primary: ({ opacityVariable, opacityValue }) => {
					return "var(--color-primary)";
				},
				secondary: "var(--color-secondary)",
				main: "var(--main)",
				background: "var(--background)",
				header: "var(--header)",
				accent: "var(--accent)",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
