import globals from 'globals'
import merge from '@sequencemedia/eslint-config-standard/merge'

export default [
  ...merge({
    files: [
      '*.{cjs,mjs}'
    ],
    ignores: [
      'pub/*'
    ],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  }),
  ...merge({
    files: [
      'src/**/*.{cjs,mjs}'
    ],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  })
]
