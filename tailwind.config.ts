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
        ocean: { DEFAULT: '#0B3D5E', mid: '#1A6B8A' },
        aqua: { DEFAULT: '#00D4C8', dim: '#0A9E8A' },
        sand: { DEFAULT: '#F2F0ED', border: '#E4E0D8' },
        dark: '#0B1F2E',
        muted: '#9BA3AF',
      },
    },
  },
  plugins: [],
};
export default config;
