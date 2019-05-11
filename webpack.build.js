const path = require('path')
const fs = require('fs')
const webpack = require('webpack')

function build (configPath) {
  const config = require(`./${configPath}`)
  webpack(config, (err, stats) => { // Stats Object
    if (err || stats.hasErrors()) {
      // Handle errors here
      console.log(stats.toString({
        // Add console colors
        colors: true
      }))
    }
    // Done processing
    console.log(stats.toString({
      // Add console colors
      colors: true
    }))
  });
}

function traverseDir (dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file)
    if (fs.lstatSync(fullPath).isDirectory()) {
      //  console.log(fullPath);
      traverseDir(fullPath)
    } else if (file === 'webpack.config.js') {
      build(fullPath)
    }
  })
}

traverseDir('src')