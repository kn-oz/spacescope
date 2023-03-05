/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      dark: "#0c0e18",
      white: "#ffffff",
      black: "#000000",
      primary: "#8ECEF8",
      accent: "#d2d8f9",
    },
    fontFamily: {
      sans: ['Barlow', 'sans-serif'],
      serif: ['Bellefair', 'serif'],
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
