import path from 'path'

import {
  CleanWebpackPlugin
} from 'clean-webpack-plugin'

import Webpack from 'webpack'

import TerserPlugin from 'terser-webpack-plugin'

const {
  EnvironmentPlugin,
  SourceMapDevToolPlugin
} = Webpack

const srcPath = path.join(path.resolve('./src'), 'js/app.js')
const pubPath = path.join(path.resolve('./pub'), 'assets/js')

export default {
  mode: 'production',
  entry: {
    app: srcPath
  },
  output: {
    path: pubPath,
    filename: '[name].js'
  },
  stats: {
    colors: true
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: false,
      cleanOnceBeforeBuildPatterns: [
        pubPath.concat('/*.js'),
        pubPath.concat('/*.js.map')
      ]
    }),
    new EnvironmentPlugin({ NODE_ENV: 'production' }),
    new SourceMapDevToolPlugin({ filename: '[name].js.map' })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin()
    ]
  },
  experiments: {
    backCompat: false
  }
}
