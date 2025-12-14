/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Nunito"', 'sans-serif'],
        display: ['"Outfit"', 'sans-serif'],
      },
      colors: {
        banana: {
          100: '#FFF9C4',
          200: '#FFF59D',
          300: '#FFF176',
          400: '#FFEE58',
          500: '#FDD835', // Darker Primary (was FFEB3B) for better white text contrast if needed, or keeping it bright but using 600 for text
          600: '#FBC02D', // Darker for text/borders
          700: '#F9A825', // Even darker
        },
        sky: {
          400: '#38BDF8', // Secondary
        },
        rose: {
          400: '#FB7185', // Accent
        },
      },
      animation: {
        'bounce-short': 'bounce 0.5s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'pop': 'pop 0.3s ease-out forwards',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        pop: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      },
      boxShadow: {
        'card': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'button': '0 4px 0 0 rgba(0,0,0,0.1)', // 3D effect
        'button-active': '0 0 0 0 rgba(0,0,0,0)',
      }
    },
  },
  plugins: [],
}
