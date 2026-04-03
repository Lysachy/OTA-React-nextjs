import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        serif: ['var(--font-serif)'],
      },
      colors: {
        shore: {
          50: '#FAF8F5',
          100: '#F4F0EB',
          200: '#E8E2D9',
          300: '#D4CBC0',
        },
        teal: {
          50: '#EDF7F6',
          100: '#D4EDE8',
          200: '#A8DBD2',
          400: '#3AA8A4',
          500: '#1B8A8F',
          600: '#14706E',
          700: '#0F5553',
        },
        navy: {
          DEFAULT: '#0F2B3C',
          light: '#1A3D52',
          soft: '#7A8B95',
        },
        seafoam: '#D4EDE8',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        soft: '0 1px 3px rgba(15, 43, 60, 0.04), 0 8px 24px rgba(15, 43, 60, 0.06)',
        lift: '0 4px 12px rgba(15, 43, 60, 0.06), 0 20px 48px rgba(15, 43, 60, 0.08)',
        glow: '0 0 0 1px rgba(27, 138, 143, 0.12), 0 8px 24px rgba(27, 138, 143, 0.1)',
      },
    },
  },
  plugins: [],
};
export default config;
