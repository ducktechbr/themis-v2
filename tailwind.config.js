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
        primary: "#F57C00",
        secondary: "#FF9D38",
        ascent: "#ffc107",
        success: "#2E7D32",
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
