import type { Config } from "tailwindcss";

export default {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        shine: {
          '0%': { backgroundPosition: '-20px' },
          '100%': { backgroundPosition: '20px' },
        },
      },
      animation: {
        shine: 'shine 1s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
