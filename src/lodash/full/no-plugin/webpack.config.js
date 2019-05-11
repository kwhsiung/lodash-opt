const path = require('path')
const appDir = path.dirname(require.main.filename)
const base = require(`${appDir}/webpack.base.config`)

const merge = require('webpack-merge')

const config = merge(base, {
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(appDir, 'dist/lodashImportFull')
  },
})

module.exports = config