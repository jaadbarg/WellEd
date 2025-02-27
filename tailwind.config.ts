import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand': {
          primary: '#0378A6',    // Primary Blue
          secondary: '#0889A6',  // Secondary Blue
          accent: '#63AEBF',     // Light Blue
          light: '#F2F2F2',      // Light Gray
          dark: '#8C8C8C',       // Dark Gray
        },
        'blue': {
          50: '#f0f9fc',
          100: '#e0f2f7',
          200: '#c2e5ee',
          300: '#90d0e0',
          400: '#63AEBF',  // Our accent color
          500: '#3d9db2',
          600: '#0889A6',  // Our secondary blue
          700: '#0378A6',  // Our primary blue
          800: '#025e80',
          900: '#024d68',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        fade: 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;