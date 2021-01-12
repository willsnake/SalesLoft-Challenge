module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        'user-pattern': "url('/icons/user.svg')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
