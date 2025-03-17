/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'navy-900': '#000624',
        'navy-950': '#000312',
        'carbon-900': '#0A0A0A',
        'carbon-950': '#050505',
      },
      screens: {
        'xs': '375px',
      },
    },
  },
  plugins: [],
};