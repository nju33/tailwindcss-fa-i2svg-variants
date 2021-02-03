/**
 * @jest-environment ../selemium-environment.js
 */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../global-environment.d.ts" />

// import * as webdriver from 'selenium-webdriver'

jest.setTimeout(60 * 60 * 1000)

import defaultConfig = require('tailwindcss/defaultConfig')

const ExpectedColors = Object.freeze({
  active: defaultConfig.theme.colors.green['500'],
  pending: defaultConfig.theme.colors.purple['500'],
  complete: defaultConfig.theme.colors.blue['500']
})

test.each([
  ['fa-i2svg-active-and-fa-i2svg-pending.html', ExpectedColors.pending],
  ['fa-i2svg-active.html', ExpectedColors.active],
  ['fa-i2svg-pending.html', ExpectedColors.pending],
  ['fa-i2svg-complete.html', ExpectedColors.complete]
])('%s has enabled %s as background color', async (filename, expectedColor) => {
  await global.driver?.get(
    `http://127.0.0.1:${
      process.env.PORT ?? '58679'
    }/__tests__/fixtures/${filename}`
  )

  // A color value like `rgb(n,n,n)`
  const _color = await global.driver?.executeScript<string>(() => {
    return window.getComputedStyle(document.body).backgroundColor
  })
  expect(_color).toEqual(expect.any(String))

  const color = _color as string
  const hexColor = '#'.concat(
    color
      .slice(4, -1)
      .split(/,\s?/)
      .map((stringNumber) => {
        return Number(stringNumber).toString(16)
      })
      .join('')
  )

  expect(hexColor).toBe(expectedColor)
})

export {}
