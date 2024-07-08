import globals from 'globals'
import merge from '@sequencemedia/eslint-config-standard/merge'

export default (
  merge({
    files: [
      '**/*.{cjs,mjs}'
    ],
    ignores: [
      'pub/*'
    ],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  })
    .concat(
      merge({
        files: [
          'src/**/*.js'
        ],
        languageOptions: {
          globals: {
            ...globals.browser
          }
        }
      })
    )
)
