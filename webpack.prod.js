const path = require('path')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const { param, common } = require('./webpack.common.js')

const extConfig = {
  mode: 'production',
}

const extPlugins = [new CleanWebpackPlugin(param.distPath)]

module.exports = {
  ...common,
  ...extConfig,
  plugins: [...common.plugins, ...extPlugins],
}
