/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-1": "#16162D",
        "bg-2": "#1F1F35",
        "bg-3": "#17182F",
        "bg-4": "#15152E",
        // "bg-5": "#999FFF",
        "txt-1": "#399CE1",
        "txt-2": "#A5A5B2",
      },
      fontFamily: {
        "dm-sans": ["DM\\ Sans", "sans-serif"],
        "sf-pro": ["Sf\\ Pro", "sans-serif"],
      },
      borderColor: {
        "border-1-line": "#99a0ff64",
      },
    },
  },
  plugins: [],
};
