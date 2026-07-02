/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', '"Sora"', "system-ui", "sans-serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
      },
      colors: {
        ink: {
          950: "#07070d",
          900: "#0b0b16",
          800: "#12122a",
          700: "#1a1a3d",
        },
        neon: {
          purple: "#a855f7",
          blue: "#3b82f6",
          cyan: "#22d3ee",
          orange: "#fb923c",
          pink: "#ec4899",
        },
      },
      backgroundImage: {
        "grad-brand":
          "linear-gradient(135deg,#a855f7 0%,#3b82f6 40%,#22d3ee 75%,#fb923c 100%)",
        "grad-soft":
          "radial-gradient(1200px 600px at 10% 0%, rgba(168,85,247,0.18), transparent 60%), radial-gradient(900px 500px at 90% 100%, rgba(34,211,238,0.15), transparent 60%), radial-gradient(700px 500px at 60% 40%, rgba(251,146,60,0.10), transparent 60%)",
      },
      boxShadow: {
        glow: "0 10px 40px -10px rgba(168,85,247,0.45), 0 6px 24px -12px rgba(34,211,238,0.35)",
        glowLg:
          "0 20px 60px -10px rgba(168,85,247,0.6), 0 10px 40px -12px rgba(34,211,238,0.4)",
      },
      keyframes: {
        floaty: {
          "0%,100%": { transform: "translateY(-6px)" },
          "50%": { transform: "translateY(6px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
      },
    },
  },
  plugins: [],
};
