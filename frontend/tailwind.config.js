/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
          coral: '#FF385C',
          'coral-dark': '#E00B41',
          'coral-light': '#FFF5F5',
          terracotta: '#E0565B'
        },
        neutral: {
          50: '#FBFBFB',
          100: '#F7F7F7',
          200: '#EBEBEB',
          300: '#DDDDDD',
          400: '#B0B0B0',
          500: '#717171',
          600: '#5E5E5E',
          700: '#484848',
          800: '#222222',
          900: '#111111',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'airbnb': '0 3px 10px rgba(0, 0, 0, 0.08)',
        'airbnb-hover': '0 6px 20px rgba(0, 0, 0, 0.12)',
        'float': '0 12px 32px rgba(0, 0, 0, 0.12)',
        'search': '0 3px 12px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.08)',
        'modal': '0 20px 40px rgba(0, 0, 0, 0.18)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      }
    },
  },
  plugins: [],
}
