/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        jumbotronIndex: "url('../public/img/home/jumbo.jpg')",
      },
      fontFamily: {
        sans: ["PT Sans Narrow", "sans-serif"],
        serif: ["Signika", "sans-serif"],
      },
      colors: {
        marinho: {
          50: "#d3d4dc",
          100: "#a8abbb",
          200: "#7e849a",
          300: "#565e7a",
          400: "#2f3b5c",
          500: "#061C3C",
          600: "#051935",
          700: "#09152c",
          800: "#0a1122",
          900: "#080c1a",
        },
        orange: {
          50: "#ffe8d9",
          100: "#ffd1b5",
          200: "#ffbb91",
          300: "#ffa46d",
          400: "#fc8d49",
          500: "#f47621",
          600: "#c8621f",
          700: "#9d4e1c",
          800: "#743c18",
          900: "#4e2a14",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
