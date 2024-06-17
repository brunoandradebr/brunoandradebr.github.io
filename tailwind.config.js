/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: 'var(--text-base)',
        accent: 'var(--text-accent)',
        primary: 'var(--primary)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'foreground-hover': 'var(--foreground-hover)',
        'header-border': 'var(--header-border)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate-y-3px)' },
          '50%': { transform: 'translatey(3px)' },
        },
      },
      animation: {
        float: 'float 1s infinite ease-in-out',
      },
    },
  },
  plugins: [],
}
