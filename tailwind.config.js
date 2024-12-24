/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        grain: {
          '0%, 100%': { backgroundPosition: '0% 0%' },
          '20%': { backgroundPosition: '-50% -50%' },
          '40%': { backgroundPosition: '-25% 25%' },
          '60%': { backgroundPosition: '50% 50%' },
          '80%': { backgroundPosition: '25% -25%' },
        }
      },
      animation: {
        'grain': 'grain 8s steps(10) infinite',
      },
    },
  },
  plugins: [],
} 