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
      backgroundImage: (theme) => ({
        'homeImg': 'url(/src/img/homePhoto.jpg)',
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
