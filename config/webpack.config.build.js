'use strict'

const webpackBaseConfig = require('./webpack.config.js')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

webpackBaseConfig.output.path = '.build'

// output css file
// const cssExtractor = new ExtractTextPlugin('/app/public/bundle.css')
// webpackBaseConfig.module.loaders.push({
//   test: /\.scss$/i,
//   loader: cssExtractor.extract(['css', 'sass'])
// })
// webpackBaseConfig.plugins.push(cssExtractor)

module.exports = webpackBaseConfig
