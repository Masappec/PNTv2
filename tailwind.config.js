/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        
        "primary": {
          100:  "#b2e5f9",
          200:  "#7fd3f5",
          300: "#4dc2f1",
          400: "#24b5ef",
          500: "#00a8ed",
          600: "#009ade",
          700: "#0087cb",
          800: "#0076b7",
          900: "#005796"
        }

      }
    },
  },
  plugins: [],
}

