/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Sora', 'sans-serif'],  // 👈 overrides Tailwind’s default sans
      },
      colors: {
        primary: "#455E86",
        secondary: "#22C55E",
      },
    },
  },
  plugins: [],
}
