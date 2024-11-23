import {
  join,
  resolve
} from 'node:path'

import Webpack from 'webpack'

import {
  CleanWebpackPlugin as CleanPlugin
} from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import RemoveFilesPlugin from 'remove-files-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'

const {
  EnvironmentPlugin,
  SourceMapDevToolPlugin
} = Webpack

const srcPath = resolve('./src')
const pubPath = resolve('./pub/assets')

export default {
  mode: 'production',
  entry: {
    sequencemedia: join(srcPath, 'sass/sequencemedia.scss')
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
  module: {
    rules: [
      {
        test: /\.(cjs|mjs)$/,
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
              sourceMap: true,
              url: false
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
        join(pubPath, '*.css'),
        join(pubPath, '*.css.map'),
        join(pubPath, '*.cjs'),
        join(pubPath, '*.cjs.map'),
        join(pubPath, '*.mjs'),
        join(pubPath, '*.mjs.map')
      ]
    }),
    new EnvironmentPlugin({
      NODE_ENV: 'production'
    }),
    new SourceMapDevToolPlugin({
      test: /\.css$/i,
      filename: 'css/[name].css.map'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: join(srcPath, 'js/analytics.mjs'),
          to: join(pubPath, 'js/analytics.mjs')
        }
      ]
    }),
    new RemoveFilesPlugin({
      after: {
        test: [
          {
            folder: join(pubPath, 'css'),
            method (filePath) {
              return (
                filePath.endsWith('.js') ||
                filePath.endsWith('.js.map')
              )
            }
          },
          {
            folder: join(pubPath, 'js'),
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
