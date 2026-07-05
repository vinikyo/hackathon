/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  corePlugins: {
    // CRÍTICO: o preflight (reset global do Tailwind) fica DESLIGADO.
    // Com ele ligado, o reset sobrescreveria o CSS custom do site
    // (globals.css). Desligado, o Tailwind só gera as classes
    // utilitárias que os jogos portados da branch main usam.
    preflight: false,
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
