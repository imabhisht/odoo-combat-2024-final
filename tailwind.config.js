/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        default: '#1EB2A6',
        light: {
          default: '#1EB2A6',
          primary_light: '#fff',
          primary_hover: '#1EB2A6',
        },
        dark: {
          default: '#334756',
          primary_light: "#1A202C",
        },
      },
    },
  },
  darkMode: 'selector',
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}