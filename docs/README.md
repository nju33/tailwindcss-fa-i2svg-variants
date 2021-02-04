tailwindcss-fa-i2svg-variants / [Exports](modules.md)

# tailwindcss-fa-i2svg-variants

A plugin is to add some variants for Font Awesome kit on svg technology.

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Install Packages

There are two ways to install.

```bash
# 1. by yarn
yarn add -D tailwindcss tailwindcss-fa-i2svg-variants
# 2. by npm
npm i --save-dev tailwindcss tailwindcss-fa-i2svg-variants
# If npm@>=7 is, you can omit tailwindcss.
# npm installs it automatically.
npm i --save-dev tailwindcss-fa-i2svg-variants
```

## Use The Plugin

First, You put this plugin to `plugins` of your tailwindcss config.

```js
const faI2svgVariants = require('tailwindcss-fa-i2svg-variants')

module.exports = {
  // ...
  plugins: [faI2svgVariants]
  // ...
}
```

Here, You can use three variants following like:

1. `fa-i2svg-active` for `.fontawesome-i2svg-active`
2. `fa-i2svg-pending` for `.fontawesome-i2svg-pending`
3. `fa-i2svg-complete` for `.fontawesome-i2svg-complete`

Next, You put those variants too. For instance, You think what "I'd like to use with `display` theme", then you can be following like:

```js
const faI2svgVariants = require('tailwindcss-fa-i2svg-variants')
const defaults = require('tailwindcss/defaultConfig')

module.exports = {
  // ...
  variants: {
    extend: {
      display: [
        ...defaults.variants.display,
        'fa-i2svg-active',
        'fa-i2svg-pending',
        'fa-i2svg-complete'
      ]
    }
  },
  plugins: [faI2svgVariants]
  // ...
}
```

Everything is ready!

After, you just use generated classes for your `.html`, `.jsx`, `.tsx` or `.vue` etc.
Of course, It is with the appropriate how-two of Font Awesome.

```html
<body class="hidden fa-i2svg-active:block">
</body>
```

## References

- [SVG Asynchronous Loading - Font Awesome](https://fontawesome.com/how-to-use/on-the-web/advanced/svg-asynchronous-loading)
