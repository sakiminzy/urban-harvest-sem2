/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        forest: "#2f6b4f",
        earth: "#c77643",
        sand: "#f6f3ec",
      },
      fontFamily: {
        display: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        soft: "0 12px 30px rgba(47, 107, 79, 0.12)",
      },
    },
  },
  plugins: [],
};
