const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const debug = require('debug')('lodash-opt:webpack.config.js')

const mode = 'production'
const generateEntry = entryPath => path.resolve(__dirname, entryPath)
const generateOutput = (entryPath, pluginName) => {
  const fileName = path.basename(entryPath, '.js')
  const lodashPackageName = path.dirname(entryPath)

  return {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, `dist/${lodashPackageName}/${fileName}/${pluginName}`)
  }
}
const babelLoaderConfig = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader'
  }
}
const babelLoaderConfigLodash = Object.assign({}, babelLoaderConfig, {
  use: {
    loader: 'babel-loader',
    options: {
      plugins: [ 'lodash' ]
    }
  }
})
const optimization = {
  splitChunks: {
    chunks: 'all'
  }
}
const generatePlugins = path => {
  debug(path)
  return [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: `${path}/report.html`,
      openAnalyzer: false
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Output Management'
    })
  ]
}

module.exports = function (entryPath) {
  debug(`Start generate configs of: ${entryPath}`)

  const configs = [
    'plugin-none',
    'plugin-babel',
    'plugin-webpack',
    'plugin-both'
  ].map(pluginName => {
    const entry = generateEntry(entryPath)
    const output = generateOutput(entryPath, pluginName)
    const babelConfig =
      pluginName === 'plugin-babel' || pluginName === 'plugin-both'
        ? babelLoaderConfigLodash
        : babelLoaderConfig
    const plugins =
      pluginName === 'plugin-webpack' || pluginName === 'plugin-both'
        ? generatePlugins(output.path).concat([ new LodashModuleReplacementPlugin() ])
        : generatePlugins(output.path)

    return {
      name: pluginName,
      mode,
      entry,
      output,
      module: {
        rules: [
          babelConfig
        ]
      },
      optimization,
      plugins
    }
  })

  return configs
}
