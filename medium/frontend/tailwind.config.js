/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily:{
      signature:['Playfair Display SC'],
      heading:['PT Serif'],
      poppins:['Poppins']
    }
  },
  plugins: [],
}