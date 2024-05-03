/** @type {import('tailwindcss').Config} */
const inputPlugin = require('./style-plugins/inputPlugin')
const buttonPlugin = require('./style-plugins/buttonPlugin')


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xl': '870px',
        'lg': '670px',
        'md': '630px',
        'sm': '550px',
        'xs': '450px',
        '2xs': '380px',
      },
      inset: {
        '31.2': '7.8rem',
      },
      width: {
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
        '132': '33rem',
        '144': '36rem',
        '148': '37rem',
        '160': '40rem',
        '200': '50rem',
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

