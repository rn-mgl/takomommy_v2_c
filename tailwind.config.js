const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        head: ["Righteous", ...defaultTheme.fontFamily.sans],
        body: ["Montserrat", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        "blk-mn": "#0d0d0d",
        "blk-sc": "#262526",
        "red-mn": "#d91e2e",
        "red-sc": "#590202",
        ylw: "#ffc51f",
        orng: "#e66d1b",
        wht: "#f0f0f2",
      },
      screens: {
        "m-s": "320px",
        "m-m": "375px",
        "m-l": "425px",
        t: "768px",
        "l-s": "1024px",
        "l-l": "1440px",
      },
      backgroundSize: {
        75: "75% 75%",
        85: "85% 75%",
        100: "100% 75%",
      },
      dropShadow: {
        text: "0rem 0.2rem 0.15rem rgba(0,0,0,0.5)",
      },
      boxShadow: {
        "top-md": "0rem -0.2rem 0.4rem 0.2rem rgba(0,0,0,0.5)",
        "left-md": "-0.2rem 0rem 0.4rem 0.2rem rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
};
