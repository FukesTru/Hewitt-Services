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
        // Greens sampled from the client's existing site: a deep green for
        // dark bands and a mid green for accents. Everything else is a tint
        // of those two, chosen so each pairing clears WCAG 2.1 AA.
        forest: {
          DEFAULT: "#2C4A28",
          dark: "#1E3419",
          light: "#3E7D45",
        },
        moss: {
          DEFAULT: "#8CBF94",
          // Dark moss is the only green approved for TEXT on light
          // backgrounds — 6.5:1 on white. The DEFAULT is for dark bands.
          dark: "#2F6A38",
          light: "#BFDCC4",
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
