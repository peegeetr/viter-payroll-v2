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
      keyframes: {
        shake: {
          "0%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(2px)" },
          "50%": { transform: "translateX(-2px)" },
          "75%": { transform: "translateX(2px)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        shake: "shake .2s ease-in-out",
      },
    },
  },
  plugins: [],
};
