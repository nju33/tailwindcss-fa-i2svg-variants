import plugin = require('tailwindcss/plugin')

const Variants = Object.freeze({
  'fa-i2svg-active': 'fa-i2svg-active',
  'fa-i2svg-pending': 'fa-i2svg-pending',
  'fa-i2svg-complete': 'fa-i2svg-complete'
})

const callback: plugin.Callback = ({ addVariant, e }) => {
  addVariant(Variants['fa-i2svg-active'], ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `:root.fontawesome-i2svg-active .${e(
        `${Variants['fa-i2svg-active']}${separator}${className}`
      )}`
    })
  })

  addVariant(Variants['fa-i2svg-pending'], ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `:root.fontawesome-i2svg-pending .${e(
        `${Variants['fa-i2svg-pending']}${separator}${className}`
      )}`
    })
  })

  addVariant(
    Variants['fa-i2svg-complete'],
    ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => {
        return `:root.fontawesome-i2svg-complete .${e(
          `${Variants['fa-i2svg-complete']}${separator}${className}`
        )}`
      })
    }
  )
}

export const faSvgLoadingVariantsPlugin = plugin(callback)
