const {
  env: {
    NODE_ENV = 'development'
  }
} = process

const presets = [
  [
    '@babel/env', {
      useBuiltIns: 'entry',
      targets: {
        node: 'current'
      },
      corejs: '3.0.1'
    }
  ]
]

const plugins = [
  '@babel/proposal-export-default-from',
  '@babel/proposal-do-expressions',
  '@babel/proposal-export-namespace-from',
  '@babel/proposal-throw-expressions',
  [
    '@babel/proposal-class-properties',
    {
      loose: false
    }
  ],
  [
    'module-resolver',
    {
      root: ['./src'],
      cwd: 'babelrc',
      alias: {
        '@sequencemedia': './src',
        build: './build'
      }
    }
  ]
]

module.exports = (api = { cache: { using: () => console.error({ NODE_ENV }) } }) => {
  console.log({ NODE_ENV })

  api.cache.using(() => NODE_ENV)

  return {
    presets,
    plugins
  }
}
