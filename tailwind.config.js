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
      accent: 'cd009c',
      purple: {
        50: '#f4f3ff',
        100: '#ece9fe',
        200: '#dbd5ff',
        300: '#bfb4fe',
        400: '#a089fc',
        500: '#825af8',
        600: '#7137f0',
        700: '#6325dc', // Hover
        800: '#5620c0', // Primary
        900: '#461b97',
        950: '#290f66',
      },
      yellow: {
        50: '#fdfde9',
        100: '#fbfcc5',
        200: '#f9f871', // Secondary
        300: '#f7ef4d',
        400: '#f3e01c',
        500: '#e3c70f',
        600: '#c49d0a',
        700: '#9c710c',
        800: '#815a12',
        900: '#6e4915',
        950: '#402608',
      },
      gray: {
        50: '#f7f7f7',
        100: '#e3e3e3',
        200: '#c8c8c8',
        300: '#a4a4a4',
        400: '#818181',
        500: '#666666',
        600: '#515151',
        700: '#434343',
        800: '#383838',
        900: '#313131', // Secondary if image background
        950: '#191919', // Default background or secondary if image background
      },
      red: {
        50: '#fff0f4',
        100: '#ffe2ea',
        200: '#ffcada',
        300: '#ff9fbc',
        400: '#ff699a',
        500: '#ff2571',
        600: '#ed1168',
        700: '#c80859',
        800: '#a80951', // default
        900: '#8f0c4b',
        950: '#500125',
      },
      orange: {
        50: '#fff3ed',
        100: '#ffe4d4',
        200: '#ffc5a8',
        300: '#ff9c71',
        400: '#ff794f',
        500: '#fe4011',
        600: '#ef2607',
        700: '#c61708',
        800: '#9d150f', // default
        900: '#7e1510',
        950: '#440606',
      },
      blue: {
        50: '#edfdff',
        100: '#d6f9ff',
        200: '#b5f6ff',
        300: '#83f3ff',
        400: '#48e9ff',
        500: '#1ed0ff',
        600: '#06b7ff',
        700: '#009cf3',
        800: '#087cc5', // default
        900: '#0d689b',
        950: '#0e3e5d',
      },
      black: '#000000',
      white: '#ffffff',
      transparent: 'transparent',
    },
  },
  plugins: [],
};
