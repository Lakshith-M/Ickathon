/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          plum: '#4a154b',
          plumDark: '#2c0c2d',
          offWhite: '#fdfbf7',
          coral: '#ff6b6b',
        }
      }
    },
  },
  plugins: [],
}
