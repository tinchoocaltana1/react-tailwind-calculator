/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js, jsx, ts, tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'basic': '8px 8px 3px rgba(132, 169, 140, 0.2)'
      },
    },
  },
  plugins: [],
}

