/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Define primary and secondary colors
        primary: "#1478D2",  // Medium blue
        secondary: "#0D2745", // Dark blue (navy)
        accentYellow: "#FFD700", // Golden yellow
        accentOrange: "#FF965A", // Orange
        // // Link to CSS variables if you want to use dynamic theming
        // background: "var(--background)",
        // foreground: "var(--foreground)",
      },
      fontFamily: {
        // Define custom fonts
        anuphan: ["var(--font-anuphan)", "sans-serif"],
        supremeBold: ["var(--font-supreme-bold)", "sans-serif"],
        supremeExtrabold: ["var(--font-supreme-extrabold)", "sans-serif"],
        supremeMedium: ["var(--font-supreme-medium)", "sans-serif"],
        supremeRegular: ["var(--font-supreme-regular)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
