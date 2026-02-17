
/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"VT323"', 'monospace'],
        mono: ['"VT323"', 'monospace'],
        retro: ['"VT323"', 'monospace'],
      },
      colors: {
        tos: {
          black: '#000000',
          blue: '#0000AA',
          green: '#00AA00',
          cyan: '#00AAAA',
          red: '#AA0000',
          magenta: '#AA00AA',
          brown: '#AA5500',
          lightgray: '#AAAAAA',
          darkgray: '#555555',
          brightblue: '#5555FF',
          brightgreen: '#55FF55',
          brightcyan: '#55FFFF',
          brightred: '#FF5555',
          brightmagenta: '#FF55FF',
          yellow: '#FFFF55',
          white: '#FFFFFF',
        }
      },
      cursor: {
        crosshair: 'crosshair',
      },
      boxShadow: {
        'none': 'none',
      },
      borderWidth: {
        '3': '3px',
      }
    },
  },
  plugins: [],
}
