/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        lavender: '#E6E6FA',
        black: {
          DEFAULT: '#0A0A0A',
          light: '#1A1A1A',
        },
      },
      fontFamily: {
        sans: ['Raleway', 'sans-serif'],
      },
    },
  },
  plugins: [],
};