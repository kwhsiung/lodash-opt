const path = require('path')
// const appDir = path.dirname(require.main.filename)
// const relativePath = path.relative(appDir, __dirname)

// const merge = require('webpack-merge')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

module.exports = function (jsPath) {
  const fileName = path.basename(jsPath, '.js')
  const lodashPackageName = path.dirname(jsPath)

  const configPluginNone = {
    name: 'plugin-none',
    mode: 'production',
    entry: path.resolve(__dirname, jsPath),
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, `dist/${lodashPackageName}/${fileName}/plugin-none`)
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false
      }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Output Management'
      })
    ]
  }

  const configPluginBabel = {
    name: 'plugin-babel',
    mode: 'production',
    entry: path.resolve(__dirname, jsPath),
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, `dist/${lodashPackageName}/${fileName}/plugin-babel`)
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            plugins: ['lodash']
          }
        }
      ]
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false
      }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Output Management'
      })
    ]
  }

  const configPluginWebpack = {
    name: 'plugin-webpack',
    mode: 'production',
    entry: path.resolve(__dirname, jsPath),
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, `dist/${lodashPackageName}/${fileName}/plugin-webpack`)
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },
    plugins: [
      new LodashModuleReplacementPlugin(),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false
      }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Output Management'
      })
    ]
  }

  const configPluginBoth = {
    name: 'plugin-both',
    mode: 'production',
    entry: path.resolve(__dirname, jsPath),
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, `dist/${lodashPackageName}/${fileName}/plugin-both`)
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            plugins: ['lodash']
          }
        }
      ]
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },
    plugins: [
      new LodashModuleReplacementPlugin(),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false
      }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Output Management'
      })
    ]
  }

  return [
    configPluginNone,
    configPluginBabel,
    configPluginWebpack,
    configPluginBoth
  ]
}
