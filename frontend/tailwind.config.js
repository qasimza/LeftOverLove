/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  important: "#root",
  theme: {
    colors: {
      gunmetal: "#223843ff",
      "paynes-gray": "#56676fff",
      "cadet-gray": "#89959bff",
      "antiflash-white": "#eff1f3ff",
      timberwolf: "#dbd3d8ff",
      "desert-sand": "#d8b4a0ff",
      "atomic-tangerine": "#d89781ff",
      "burnt-sienna": "#d77a61ff",
    },
    extend: {
      backgroundImage: {
        logo: "url('/src/assets/Designer.gif')",
      },
    },
  },
  plugins: [],
};
