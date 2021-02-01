// @ts-ignore
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin')

module.exports = {
  addons: [
    '@storybook/addon-actions/register',
    '@storybook/addon-knobs/register'
  ],
  stories: ['../src/**/*.stories.tsx'],
  /**
   * @param {import('webpack').Configuration} config
   */
  webpackFinal: (config) => {
    if (typeof config.module === 'object') {
      config.module.rules.push({
        test: /\.tsx?$/,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              transpileOnly: true
            }
          }
        ]
      })
    }

    if (typeof config.resolve === 'object') {
      config.resolve.plugins = [new TsconfigPathsPlugin()]

      if (typeof config.resolve.extensions === 'object') {
        config.resolve.extensions.push('.ts', '.tsx')
      }
    }

    return config
  }
}
