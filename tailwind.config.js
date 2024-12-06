/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
            600: '#1d4ed8', // Example blue color
            700: '#1e40af',
        },
    },
    },
  },
  plugins: [],
}