/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'afacad': ['var(--font-afacad)', 'sans-serif'],
        'geist': ['var(--font-geist)', 'system-ui', 'sans-serif'],
        'sans': ['var(--font-geist)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': 'var(--text-xs)',
        'sm': 'var(--text-sm)',
        'base': 'var(--text-base)',
        'lg': 'var(--text-lg)',
        'xl': 'var(--text-xl)',
        '2xl': 'var(--text-2xl)',
        '3xl': 'var(--text-3xl)',
        '4xl': 'var(--text-4xl)',
        '5xl': 'var(--text-5xl)',
        '6xl': 'var(--text-6xl)',
        '7xl': 'var(--text-7xl)',
      },
      fontWeight: {
        'light': 'var(--font-light)',
        'normal': 'var(--font-normal)',
        'medium': 'var(--font-medium)',
        'semibold': 'var(--font-semibold)',
        'bold': 'var(--font-bold)',
      },
      animation: {
        'grain': 'grain 8s steps(10) infinite',
      },
      typography: {
        DEFAULT: {
          css: {
            fontFamily: 'var(--font-geist), system-ui, sans-serif',
            maxWidth: '65ch',
            h1: {
              fontWeight: 400,
              fontSize: 'var(--text-7xl)',
              letterSpacing: '-0.025em',
            },
            h2: {
              fontWeight: 700,
              fontSize: 'var(--text-3xl)',
              letterSpacing: '-0.025em',
            },
            h3: {
              fontWeight: 600,
              fontSize: 'var(--text-2xl)',
            },
            p: {
              fontSize: 'var(--text-xl)',
              lineHeight: 1.75,
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
