/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", ],
  theme: {
    extend: {
      colors:{
        main:"var(--main)",
        secondary:"#0B6E3AC4"
      },
    },
  },
  plugins: [],
}

