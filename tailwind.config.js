const defaults = require('tailwindcss/defaultConfig')

module.exports = {
  purge: ['./src/**/__tests/**/*.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {}
  },
  variants: {
    extend: {
      backgroundColor: [
        ...defaults.variants.backgroundColor,
        'fa-i2svg-active',
        'fa-i2svg-pending',
        'fa-i2svg-complete'
      ]
    }
  },
  plugins: [require('./out')]
}
