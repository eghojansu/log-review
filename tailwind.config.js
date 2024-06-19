import Form from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['public/index.php', 'resources/app/**/*.jsx'],
  theme: {
    extend: {},
  },
  plugins: [
    Form(),
  ],
}
