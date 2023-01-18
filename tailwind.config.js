/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/assets/javascripts/**/*.js",
    "./app/views/**/*.{html,erb}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
