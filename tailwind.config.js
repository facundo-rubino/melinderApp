/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        MLblue: '#2d3277',
        MLyellow: '#ffe600',
        MLgreen: '#00a650',
        MLblueHover: '#4851c8',

      },
      backgroundImage: {
        'desktop-main': "url('./src/img/peoplecarWeb@2x.png)",
        'mobile-main': "url('./img/peopleWcar@2x.png')",
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
