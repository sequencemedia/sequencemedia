const path = require('path')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
const {
  EnvironmentPlugin,
  SourceMapDevToolPlugin
} = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')

const srcPath = path.join(path.resolve('./src'), 'js/app.js')
const pubPath = path.join(path.resolve('./pub'), 'assets/js')

module.exports = {
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
  externals: {
    jquery: 'jQuery'
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
    minimizer: [
      new TerserPlugin({ sourceMap: true })
    ]
  }
}
