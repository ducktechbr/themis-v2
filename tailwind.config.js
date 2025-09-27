/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  presets: [require("nativewind/preset")],
  content: [
    "./src/App.tsx",
    "./src/app/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/screens/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins_400Regular", "Poppins_600SemiBold", "Poppins_700Bold"],
      },
      colors: {
        primary: "#f4f4f5",
        secondary: "#ffffff",
        ascent: "#f3842a",
        success: "#22c55e",
        error: "#ef4444",
        warning: "#facc15",
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".font-normal": { fontFamily: "Poppins_400Regular" },
        ".font-semibold": { fontFamily: "Poppins_600SemiBold" },
        ".font-bold": { fontFamily: "Poppins_700Bold" },
      });
    }),
  ],
};
