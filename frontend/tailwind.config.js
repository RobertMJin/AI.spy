/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'canvas-background' : "url('https://i.imgur.com/LvfONyA.gif')",
        'profile-background' : "url('https://i.imgur.com/9yW0Mwc.png')"
      },
    },
  },
  plugins: [],
}

