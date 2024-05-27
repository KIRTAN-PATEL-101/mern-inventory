/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transform: ['responsive', 'hover', 'focus'],
      translate: ['responsive', 'hover', 'focus'],
    },
  },
  plugins: [],
}

