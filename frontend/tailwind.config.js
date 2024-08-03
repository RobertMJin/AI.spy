/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'canvas-background' : "url('https://www.thesprucecrafts.com/thmb/doYzRzmTVm-2ANCm0gtbHu0GaPU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/9-56a810973df78cf7729bd058.png')"
      },
    },
  },
  plugins: [],
}

