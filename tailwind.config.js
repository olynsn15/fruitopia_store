import { defineConfig } from "tailwindcss";

export default defineConfig({
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "3rem",
      },
    },
    extend: {
      colors: {
        primary: "rgb(0, 126, 110)",
        secondary: "rgb(115, 175, 111)",
      },
      fontFamily: {
        regular: ["regular"],
        medium: ["medium"],
        bold: ["bold"],
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "slide-up": "slideUp 0.8s ease-out forwards",
        "scale-in": "scaleIn 0.8s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  safelist: [
    "text-primary",
    "hover:text-primary",
    "text-secondary",
    "hover:text-secondary",
    "bg-primary",
    "hover:bg-primary",
  ],
  plugins: [],
});
