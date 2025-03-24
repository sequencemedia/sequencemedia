import debug from 'debug'

import glob from 'glob-all'

import {
  readFile,
  writeFile
} from 'node:fs/promises'

const log = debug('sequencemedia/transform')

const JAVASCRIPTS = /(\.\/assets\/js\/\w*)-?.*\.mjs/g
const STYLESHEETS = /(\.\/assets\/css\/\w*)-?.*\.css/g

const {
  env: {
    npm_package_version: version
  } = {}
} = process

log('`sequencemedia` is awake')

function getFilePathList () {
  return new Promise((resolve, reject) => {
    glob(['./pub/*.html', './pub/**/*.html'], (e, a) => !e ? resolve(a) : reject(e))
  })
}

async function transformFile (filePath) {
  return (
    writeFile(filePath, (await readFile(filePath, 'utf8')).replace(JAVASCRIPTS, `$1-${version}.mjs`).replace(STYLESHEETS, `$1-${version}.css`), 'utf8')
  )
}

export default async function transform () {
  log('transform')

  const filePathList = await getFilePathList()

  return (
    await Promise.all(
      filePathList.map(transformFile)
    )
  )
}
