/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "rubik": ["Rubik Iso","cursive"],
        "bowlby": ["Bowlby One","cursive"],
      },
      colors: {
        "primary": "#2B3A8C",
        "secondary": "#BDDEF2",
        "tertiary": "#F2D0A7",
        "quaternary": "#D9695F",
        "quinary": "#BF2A2A",
      }
    },
  },
  plugins: [],
};
