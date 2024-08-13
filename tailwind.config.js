/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        degular: ["Degular Display", "sans-serif"],
        bricolage: ["Bricolage Grotesque", "sans-serif"],
      },
      screens: {
        xl: "1180px",
      },
    },
  },
  plugins: [],
};
