/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './node_modules/flowbite/**/*.js'
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle, var(--bg-radial-from), var(--bg-radial-to))',
      },
      colors: {

        primary: { 
          "50": "#cef4ff", 
          "100": "#abdef4", 
          "200": "#8cc3dd", 
          "300": "#69a9c6", 
          "400": "#4d95b3", 
          "500": "#1A7290", 
          "600": "#006284", 
          "700": "#015e79", 
          "800": "#004b64", 
          "900": "#00364c",
          DEFAULT: '#1A7290',
 
        },

        dark: {
          "400": "#15252B"
        },

        'primary-light': '#EAF7FC',
        'custom-orange': '#F7941D',
        'custom-orange-orange-light': '#FFF6EC',
        'custom-green': '#A5C330',
        'custom-green-light': '#F1F7D1',
        'custom-pink': '#ED7DB1',
        'custom-pink-light': '#FFF9FC',
        'custom-turquoise': '#0F857F',
        'custom-turquoise-light': '#E7FFFE',
        'custom-red': '#D31820'
      }
    },
  },
  plugins: [

    // eslint-disable-next-line no-undef
    require('flowbite/plugin'),

  ],
}

