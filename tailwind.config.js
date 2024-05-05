const { fontFamily, screens } = require("tailwindcss/defaultTheme");
import { withUt } from "uploadthing/tw";

/** @type {import('tailwindcss').Config} */
export default withUt({
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./uploadthing/**/*.{js,jsx,ts,tsx}",
  ],
  prefix: "",
  theme: {
    screens: {
      xs: "475px",
      ...screens,
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontSize: {
        "2xs": "0.625rem",
        "3xs": "0.5rem",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        "background-content": "hsl(var(--background-content))",

        muted: {
          foreground: "hsl(var(--muted-foreground))",
        },

        skeleton: {
          DEFAULT: "hsl(var(--skeleton))",
        },
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 2s ease-in-out forwards",
        fadeOut: "fadeOut 2s ease-in-out forwards",
      },

      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
});
