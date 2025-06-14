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
  extend: {},
 },
 plugins: [],
};
