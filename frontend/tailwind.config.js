/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wine: {
          50: "#faf3f4",
          100: "#f0dde1",
          300: "#c98a97",
          500: "#8f3a4b",
          600: "#6e2c3b",
          700: "#5a2330",
          900: "#2c0f16",
        },
        gold: {
          100: "#f5ecd7",
          300: "#dcbd80",
          500: "#c6a15b",
          600: "#a9843f",
        },
        cream: {
          DEFAULT: "#f6efe6",
          dark: "#ece0cf",
        },
        ink: "#241b1e",
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body: ["'Poppins'", "sans-serif"],
      },
    },
  },
  plugins: [],
}

