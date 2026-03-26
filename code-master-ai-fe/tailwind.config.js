/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          25: "#f3f2ef", 
          50: "#dad7cd",   // nền
          100: "#cfd5c2",
          200: "#a3b18a",  // phụ
          300: "#7f9f6b",
          400: "#588157",  // primary
          500: "#4b7350",
          600: "#3a5a40",  // primary đậm
          700: "#344e41",  // dark
          800: "#2c3e36",
          900: "#1f2d27"
        }
      }
    },
  },
  plugins: [],
};