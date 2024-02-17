/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',

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
          "500": "#2b81a2", 
          "600": "#006284", 
          "700": "#015e79", 
          "800": "#004b64", 
          "900": "#00364c", 
        },

        dark: {
          "400": "#15252B"
        }

      }
    },
  },
  plugins: [

    require('flowbite/plugin'),

  ],
}

