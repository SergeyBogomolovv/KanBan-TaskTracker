/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        uiPurple: '#635fc7',
        darkSecond: '#2b2c37',
        darkBg: '#20212c',
        darkGray: '#616b7c',
        lightBg: '#f5f7fc',
        iconGray: '#8c8c8c',
        modalBg: 'rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
}
