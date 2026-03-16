import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        claw: {
          50: '#f4f6fc',
          100: '#e5eaf8',
          200: '#c5d3ef',
          300: '#95afe3',
          400: '#5e84d2',
          500: '#3a62bd',
          600: '#2b4a9a',
          700: '#233c7e',
          800: '#203368',
          900: '#1e2d56',
          950: '#101732',
        },
      },
    },
  },
  plugins: [],
};
export default config;
