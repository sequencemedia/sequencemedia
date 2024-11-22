import path from 'path'

import {
  CleanWebpackPlugin as CleanPlugin
} from 'clean-webpack-plugin'

import Webpack from 'webpack'

import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import RemoveFilesPlugin from 'remove-files-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'

import CopyPlugin from 'copy-webpack-plugin'

const {
  EnvironmentPlugin,
  SourceMapDevToolPlugin
} = Webpack

const srcPath = path.join(path.resolve('./src'), 'sass/sequencemedia.scss')
const pubPath = path.join(path.resolve('./pub'), 'assets')

export default {
  mode: 'production',
  entry: {
    sequencemedia: srcPath
  },
  output: {
    path: pubPath,
    publicPath: '/assets',
    filename ({ chunk: { files } }) {
      const isCss = (
        Array
          .from(files)
          .some((file) => file.endsWith('.css'))
      )

      return (
        isCss
          ? 'css/[name].[fullhash].js'
          : 'js/[name].[fullhash].js'
      )
    }
  },
  stats: {
    colors: true
  },
  externals: {
    jquery: 'jQuery',
    debug: 'debug'
  },
  module: {
    rules: [
      {
        test: /\.mjs?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                config: false,
                plugins: [
                  [
                    'autoprefixer', {
                      remove: false
                    }
                  ],
                  [
                    'perfectionist', {
                      trimLeadingZero: false,
                      sourcemap: true,
                      indentSize: 2,
                      format: 'expanded',
                      syntax: 'scss'
                    }
                  ]
                ]
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanPlugin({
      verbose: false,
      cleanOnceBeforeBuildPatterns: [
        pubPath.concat('/*.css'),
        pubPath.concat('/*.css.map'),
        pubPath.concat('/*.cjs'),
        pubPath.concat('/*.cjs.map'),
        pubPath.concat('/*.mjs')
      ]
    }),
    new EnvironmentPlugin({
      NODE_ENV: 'production'
    }),
    new SourceMapDevToolPlugin({
      filename: 'css/[name].css.map'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(path.resolve('./src'), 'js/analytics.mjs'),
          to: path.join(pubPath, 'js/analytics.mjs')
        }
      ]
    }),
    new RemoveFilesPlugin({
      after: {
        test: [
          {
            folder: './pub/assets/css',
            method (filePath) {
              return (
                filePath.endsWith('.js') ||
                filePath.endsWith('.js.map')
              )
            }
          },
          {
            folder: './pub/assets/js',
            method (filePath) {
              return (
                filePath.endsWith('.js') ||
                filePath.endsWith('.js.map')
              )
            }
          }
        ]
      }
    })
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
