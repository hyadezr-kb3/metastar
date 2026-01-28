/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'paper': '#0f172a', // Dark Blue (Slate-900)
        'ink': '#f1f5f9',   // Light Text (Slate-100)
        'clay': '#15803d',  // Dark Green (Green-700)
        'sage': '#A8B799',  // Sage Green
        'sand': '#334155',  // Darker Sand (Slate-700)
        'indigo-muted': '#94a3b8', // Light Blue-Grey for muted text
        'red-muted': '#f87171', // Lighter Red for dark bg
      },
      fontFamily: {
        serif: ['"Noto Serif TC"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'paper': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
