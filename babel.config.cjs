const debug = require('debug')

const log = debug('@sequencemedia/sequencemedia')

const {
  env: {
    NODE_ENV = 'development'
  }
} = process

const presets = [
  [
    '@babel/env', {
      targets: {
        node: 'current'
      },
      useBuiltIns: 'usage',
      corejs: 3
    }
  ]
]

const plugins = [
  [
    'minify-dead-code-elimination',
    {
      optimizeRawSize: true
    }
  ]
]

function env () {
  log({ NODE_ENV })

  return (
    NODE_ENV === 'production'
  )
}

module.exports = (api) => {
  if (api) api.cache.using(env)

  return {
    presets,
    plugins
  }
}
