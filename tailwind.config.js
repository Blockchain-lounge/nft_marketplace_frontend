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
        "bg-3": "#1A1C38",
        "bg-4": "#15152E",
        "bg-5": "#1d1e38",
        "bg-6": "#99a0ff1a",
        "txt-1": "#399CE1",
        "txt-2": "#A5A5B2",
        "txt-3": "#bcbbbb",
        "txt-4": "#767A7F",
        "positive-color": "#2AC769",
        "negative-color": "#FB4E4E",
      },
      fontFamily: {
        "dm-sans": ["DM\\ Sans", "sans-serif"],
        "sf-pro": ["Sf\\ Pro", "sans-serif"],
      },
      borderColor: {
        "border-1-line": "#99a0ff57",
        "border-2-line": "#6a6b7a",
        "border-3-line": "#34364C",
      },
      gridTemplateColumns: {
        // added new 4 column grid as new4
        new3: "repeat(3, minmax(100px, 1fr))",
      },
    },
  },
  plugins: [],
};
