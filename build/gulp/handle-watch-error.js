import debug from 'debug'

import path from 'path'

const log = debug('@sequencemedia/sequencemedia')

export default function ({
  code = 'No error code defined',
  message = 'No error message defined',
  filename: f,
  path: p
} = {}) {
  switch (code) {
    case 'EPERM':
      log(`A watched file or directory has invalid permissions: '${path.relative(process.cwd(), f || p)}'`)
      break

    case 'ENOENT':
      log(`A watched file or directory has been deleted: '${path.relative(process.cwd(), f || p)}'`)
      break

    default:
      log(`Watch error. ${code}: ${message}.`)
      break
  }
}
