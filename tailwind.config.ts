import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xxs': '370px', // 新たに370pxブレークポイントを追加
        'xs': '480px',
        'sm': '640px',  // 以下は既定
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        nicomoji: ['NicoMoji', 'sans-serif'],
        bestten: ['BestTen-CRT', 'sans-serif'],
        fugazOne: ['Fugaz One', 'sans-serif'],
        mplus1: ['M PLUS 1', 'sans-serif'],
        nosutaru: ['Nosutaru-dotMPlusH', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
