import debug from 'debug'

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

const log = debug('sequencemedia/webpack')

const {
  EnvironmentPlugin,
  SourceMapDevToolPlugin
} = Webpack

const SOURCE_PATH = resolve('./src')
const ASSETS_PATH = resolve('./pub/assets')

const {
  env: {
    npm_package_version: version
  } = {}
} = process

log('`sequencemedia` is awake')

export default {
  mode: 'production',
  entry: {
    sequencemedia: join(SOURCE_PATH, 'sass/sequencemedia.scss')
  },
  output: {
    path: ASSETS_PATH,
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
        join(ASSETS_PATH, 'css/*.css'),
        join(ASSETS_PATH, 'css/*.css.map'),
        join(ASSETS_PATH, 'js/*.cjs'),
        join(ASSETS_PATH, 'js/*.cjs.map'),
        join(ASSETS_PATH, 'js/*.mjs'),
        join(ASSETS_PATH, 'js/*.mjs.map')
      ]
    }),
    new EnvironmentPlugin({
      NODE_ENV: 'production'
    }),
    new SourceMapDevToolPlugin({
      test: /\.css$/i,
      filename: `css/[name]-${version}.css.map`
    }),
    new MiniCssExtractPlugin({
      filename: `css/[name]-${version}.css`
    }),
    new CopyPlugin({
      patterns: [
        {
          from: join(SOURCE_PATH, 'js/analytics.mjs'),
          to: join(ASSETS_PATH, `js/analytics-${version}.mjs`)
        }
      ]
    }),
    new RemoveFilesPlugin({
      after: {
        test: [
          {
            folder: join(ASSETS_PATH, 'css'),
            method (filePath) {
              return (
                filePath.endsWith('.js') ||
                filePath.endsWith('.js.map')
              )
            }
          },
          {
            folder: join(ASSETS_PATH, 'js'),
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
