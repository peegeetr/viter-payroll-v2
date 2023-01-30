/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#630b3c",
        secondary: "#ad397f",
        dark: "#3a3b36",
      },
      fontSize: {
        huge: "clamp(2.4rem, 6vw, 5rem)",
      },
      height: {
        responsive: "clamp(5rem,17vw,22rem)",
      },
      screens: {
        xs: "420px",
      },
    },
  },
  plugins: [],
};
