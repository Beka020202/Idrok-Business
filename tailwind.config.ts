import type { Config } from "tailwindcss";

// Design tokens copied from the Idrok Academy design prompt.
// Theme-dependent colours come from CSS variables (see app/globals.css),
// so light/dark switching needs no extra classes in components.
const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0A6CFF",
          light: "#3B8CFF",
          deep: "#0A5CE0",
          soft: "var(--brand-soft)",
        },
        app: "var(--bg)",
        card: "var(--card)",
        ink: "var(--text)",
        muted: "var(--text-2)",
        faint: "var(--text-3)",
        line: "var(--border)",
        success: { DEFAULT: "#34C759", soft: "var(--success-soft)", ink: "var(--success-ink)" },
        warning: { DEFAULT: "#FF9500", soft: "var(--warning-soft)", ink: "var(--warning-ink)" },
        danger: { DEFAULT: "#FF3B30", soft: "var(--danger-soft)", ink: "var(--danger-ink)" },
        ai: { DEFAULT: "#5856D6", light: "#8B6BFF", deep: "#5B3BD6" },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: { card: "20px", btn: "16px", field: "14px", sheet: "28px" },
      spacing: { page: "20px" },
      boxShadow: {
        card: "0 1px 2px rgba(10,18,38,0.04), 0 8px 24px rgba(10,18,38,0.05)",
        brand: "0 8px 20px rgba(10,108,255,0.28)",
        ring: "0 0 0 4px rgba(10,108,255,0.15)",
      },
      transitionTimingFunction: { calm: "cubic-bezier(0.22, 1, 0.36, 1)" },
      transitionDuration: { calm: "320ms" },
    },
  },
  plugins: [],
};
export default config;
