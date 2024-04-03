/** @type {import('tailwindcss').Config} */
const inputPlugin = require('./style-plugins/inputPlugin')
const buttonPlugin = require('./style-plugins/buttonPlugin')


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      inset: {
        '31.2': '7.8rem',
      },
      width: {
        '144': '36rem',
        '160': '40rem',
        '250': '62.5rem',
      },
      colors: {
        customColorBgOne: '#53a8b6',
        customColorBgTwo: '#79c2d0',
        customColorBgThree: '#bbe4e9',
        customColorBorderOne: '#53a8b6',
      },
      fontFamily: {
        rakkas: ['Rakkas', 'cursive'],
      },
    },
  },
  plugins: [
    inputPlugin,
    buttonPlugin
  ],
}

