/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        fulldvh: '100dvh',
      },
    },
    screens: {
      tablet: '640px',
      laptop: '1024px',
      desktop: '1280px',
    },
    colors: {
      purple: {
        50: '#f4f3ff',
        100: '#ece9fe',
        200: '#dbd5ff',
        300: '#bfb4fe',
        400: '#a089fc',
        500: '#825af8',
        600: '#7137f0', // hover (text)
        700: '#6325dc', // hover (button)
        800: '#5620c0', // main color
        900: '#461b97',
      },
      gray: {
        50: '#f7f7f7', // main text
        100: '#e3e3e3',
        200: '#c8c8c8',
        300: '#a4a4a4',
        400: '#818181', // dark text
        500: '#666666',
        600: '#515151',
        700: '#434343',
        800: '#383838',
        900: '#000000', // background
      },
      red: {
        50: '#fff1f1',
        100: '#ffdfdf',
        200: '#ffc5c5',
        300: '#ff9d9d',
        400: '#ff6464',
        500: '#ff3333', // error text
        600: '#ed1515',
        700: '#c80d0d',
        800: '#a50f0f',
        900: '#881414',
      },
      yellow: {
        50: '#fffee7',
        100: '#fffec1',
        200: '#fff886',
        300: '#ffec41',
        400: '#ffdb0d',
        500: '#ffcc00', // warning text
        600: '#d19500',
        700: '#a66a02',
        800: '#89530a',
        900: '#74430f',
      },

      green: {
        50: '#f7fde8',
        100: '#edf9ce',
        200: '#dcf4a2',
        300: '#c3ea6c',
        400: '#aadc3f',
        500: '#8ac020', // second color, success color
        600: '#6c9b15',
        700: '#527615',
        800: '#425d17',
        900: '#394f18',
      },
    },
  },
  plugins: [],
};
