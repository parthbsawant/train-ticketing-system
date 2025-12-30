/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1B5E20',
        secondary: '#FF9800',
        accent: '#2196F3',
        background: '#F9FAFB',
        'text-primary': '#1C1C1C',
        'text-secondary': '#6B7280',
        error: '#E53935',
        success: '#43A047',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

