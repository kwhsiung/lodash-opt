const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
// const config = require('./webpack.config')
const getConfig = require('./webpack.config')

function build (jsPath) {
  webpack(getConfig(jsPath), (err, stats) => { // Stats Object
    if (err || stats.hasErrors()) {
      // Handle errors here
      console.log(stats.toString({ colors: true}))
    }
    // Done processing
    console.log('==================================')
    console.log(`Starting build ${jsPath}`)
    console.log(stats.toString({ colors: true}))
    console.log('==================================')
  });
}

function traverseDir (dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file)
    if (fs.lstatSync(fullPath).isDirectory()) {
      //  console.log(fullPath);
      traverseDir(fullPath)
    } else {
      // build(fullPath)
      build(fullPath)
    }
  })
}

traverseDir('src')