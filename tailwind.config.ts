import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // The four greens are lifted straight from the logo mark (see
        // components/LogoMark.tsx); forest.dark and moss.light are tints of
        // them, added where contrast needed the extra step. Every pairing the
        // design uses clears WCAG 2.1 AA — `npm run contrast` proves it.
        forest: {
          DEFAULT: "#1C4C23",
          dark: "#13351A",
          light: "#2E9C5A",
        },
        moss: {
          DEFAULT: "#86BF87",
          // Dark moss is the only green approved for TEXT on light
          // backgrounds — 5.5:1 on white. The DEFAULT is for dark bands.
          dark: "#14793A",
          light: "#BEDCBF",
        },
        mist: "#F2F6F0",
        ink: "#37413A",
        chalk: "#E3EAE2",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "72rem",
        prose: "46rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
