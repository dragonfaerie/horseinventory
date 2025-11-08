/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#0f172a",
        indigoFog: "#6366f1",
        arcLight: "#a855f7",
      },
      boxShadow: {
        "card-glow": "0 25px 45px -15px rgba(79, 70, 229, 0.45)",
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body: ["'Inter'", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
