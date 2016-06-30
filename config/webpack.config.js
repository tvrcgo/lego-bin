'use strict'

const webpack = require('webpack')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const APP_ROOT = process.cwd()

module.exports = {
  entry: {
    main: path.resolve(APP_ROOT, 'app/view/main.js')
  },
  output: {
    path: '.build',
    filename: '/app/public/[name].js'
  },
  resolve: {
    root: [
      path.resolve(APP_ROOT, 'app/view/component')
    ],
    extensions: ['', '.js', '.jsx', '.json'],
    alias: {
      '@component': path.resolve(APP_ROOT, 'app/view/component')
    }
  },
  module: {
    noParse: [],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0', 'react']
        },
        include: [
          path.resolve(APP_ROOT, 'app/view')
        ],
        exclude: ['node_modules']
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      }
    ],
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDom'
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: {
          glob: 'app/**/*',
          dot: false
        },
        ignore: 'app/view/**/*'
      },
      {
        from: 'app/view/**/*.html'
      },
      {
        from: 'app/view/lib',
        to: 'app/public/lib',
      },
      { from: 'config/**/*' },
      { from: '*' }
    ], {
      ignore: [
        '**/node_modules/**/*',
        'LICENSE',
        'README.md',
        '.*'
      ]
    })
  ]
}
