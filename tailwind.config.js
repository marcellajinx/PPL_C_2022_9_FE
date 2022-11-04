const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'nunito': '"Nunito Sans", sans-serif',
      },
      colors: {
        'themeButton': 'rgba(0,0,0,0.1)',
      },
      boxShadow: {
        'boxShadowHeader': '0 0.25rem 0.75rem rgb(0 0 0 / 10%), 0 0.2rem 0.1rem rgb(0 0 0 / 5%)',
      },
    }
  },  
  variants: {
    extend: {},
  },
}
