/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", "./src/**/*.{js,jsx,ts, tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'primary': {100 : '#1AB394', 200: '#149b7e', 300: '#126653'},
        'secondary': {100 : '#2796ce', 200: '#2481af', 300: '#1d6a91'},
        'warning': {100 : '#f0a641', 200: '#d18d34', 300: '#b77b2c'},
        'success': {100 : '#5cb73e', 200: '#297c1d', 300: '#12440c'},
        'danger': {100 : '#d62620', 200: '#ba2b27', 300: '#a82925'},
        'dark': {100 : '#334155', 200: '#1E293B', 300: '#0F172A'},
        'light': {100 : '#F1F5F9', 200: '#E2E8F0', 300: '#CBD5E1'},
      },
    },
  },
  plugins: [],
  darkMode: 'class'
}

