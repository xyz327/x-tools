/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./angular/src/**/*.{html,ts}",
    "./chrome/src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light", "dark"],
  },
}