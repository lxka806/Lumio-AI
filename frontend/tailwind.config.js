/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg:        "#07100A",
        sidebar:   "#0E1A12",
        surface:   "#122018",
        hover:     "#17281D",
        border:    "#23392B",
        lime:      "#7CF29C",   // gradient start (bright mint)
        "lime-2":  "#B6F36B",   // gradient end (your original lime)
        primary:   "#EAF5EC",
        secondary: "#8AA394",
        muted:     "#5E7264",
      },
      backgroundImage: {
        "lime-gradient": "linear-gradient(135deg, #7CF29C 0%, #B6F36B 100%)",
        "lime-gradient-soft": "linear-gradient(135deg, rgba(124,242,156,0.15) 0%, rgba(182,243,107,0.15) 100%)",
        "surface-gradient": "linear-gradient(180deg, #122018 0%, #0E1A12 100%)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "lime-glow": "0 0 24px rgba(124, 242, 156, 0.15)",
        "lime-focus": "0 0 0 3px rgba(124, 242, 156, 0.12)",
      },
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-dot": {
          "0%, 80%, 100%": { opacity: "0.25", transform: "scale(0.8)" },
          "40%":           { opacity: "1",    transform: "scale(1)"   },
        },
        "gradient-shift": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%":      { "background-position": "100% 50%" },
        },
      },
      animation: {
        "fade-up":        "fade-up 0.35s ease-out both",
        "pulse-dot":      "pulse-dot 1.2s infinite ease-in-out",
        "gradient-shift": "gradient-shift 6s ease infinite",
      },
    },
  },
  plugins: [],
};