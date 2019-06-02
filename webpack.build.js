const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const generateConfigsWithPath = require('./webpack.config')
const chalk = require('chalk')
const debug = require('debug')('lodash-opt:webpack.build.js')

function build (jsPath) {
  console.log(`Starting build ${jsPath} with four different webpack configs`)

  webpack(
    generateConfigsWithPath(jsPath),
    (err, stats) => { // Stats Object
      if (err || stats.hasErrors()) {
        // Handle errors here
        console.log(chalk.bgRed.white.bold('=================================='))
        console.log(chalk.bgRed.white.bold(`Build fail for the path: ${jsPath}`))
        console.log('\n')
        console.error(stats.toString({ colors: true }))
        console.log('\n')
        console.log(chalk.bgRed.white.bold('=================================='))
        console.log('\n')
      }
      // Done processing
      console.log(chalk.bgGreen.white.bold('=================================='))
      console.log(chalk.bgGreen.white.bold(`Build Done for the path: ${jsPath}`))
      console.log('\n')
      console.log(stats.toString({ colors: true }))
      console.log('\n')
      console.log(chalk.bgGreen.white.bold('=================================='))
      console.log('\n')
    }
  )

  // generateConfigsWithPath(jsPath)
}

function traverseDir (dir) {
  debug('Start traverse dir:', dir)
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file)
    debug('Found a file:', file)
    debug('The full path of the file is:', fullPath)

    const isDirectory = fs.lstatSync(fullPath).isDirectory()
    if (isDirectory) {
      debug(`${fullPath} is a directory, traverse recursively`)
      traverseDir(fullPath)
    } else {
      debug(`${fullPath} is a file, should start the webpack build for this file`)
      build(fullPath)
    }
  })
}

traverseDir('src')
