/** @type {import('tailwindcss').Config} */
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
        sans: [
          "Montserrat_400Regular",
          "Montserrat_500Medium",
          "Montserrat_600SemiBold",
          "Montserrat_700Bold",
        ],
      },
      colors: {
        primary: "#F57C00",
        secondary: "#FF9D38",
        ascent: "#ffc107",
        success: "#2E7D32",
      },
    },
  },
  plugins: [],
};
