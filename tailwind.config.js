/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0D1B2A",
        color2: "#415A77",
        color3: "#1B263B",
        text: "#E0E1DD",
      },
    },
  },
  plugins: [],
};
