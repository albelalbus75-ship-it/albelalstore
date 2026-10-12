/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#fdf9ed',
          100: '#faf0cf',
          200: '#f4dd9b',
          300: '#edc465',
          400: '#e6ad3b',
          500: '#d4922a',   // ذهبي أساسي
          600: '#b87320',
          700: '#93561d',
          800: '#78451e',
          900: '#653a1d',
          950: '#3a1d0c',
        },
        obsidian: {
          50:  '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#1a1a1a',
          900: '#0f0f0f',
          950: '#050505',
        },
      },
      fontFamily: {
        arabic: ['"Tajawal"', '"Cairo"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        gold: '0 4px 20px -4px rgba(212, 146, 42, 0.4)',
        'gold-lg': '0 8px 32px -8px rgba(212, 146, 42, 0.6)',
      },
    },
  },
  plugins: [],
};
