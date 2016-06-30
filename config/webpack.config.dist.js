'use strict'

const webpackBaseConfig = require('./webpack.config.js')

webpackBaseConfig.output.path = 'dist'

// Uglify Js Plugin
const uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  },
  mangle: {
    except: []
  }
}
webpackBaseConfig.plugins.push(uglifyJsPlugin)

module.exports = webpackBaseConfig
