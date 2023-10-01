/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {    
      height: {
        '88': '22rem',
      },
    },
    screens: {
      'md': '870px',
    },
  },
  plugins: [],
}
