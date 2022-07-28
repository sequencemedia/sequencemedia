import debug from 'debug'

import {
  relative
} from 'path'

const log = debug('@sequencemedia/sequencemedia')

log('`handleWatchError` is awake')

export default function handleWatchError ({
  code = 'No error code defined',
  message = 'No error message defined',
  filename: f = 'No file name defined',
  path: p = 'No path defined'
} = {}) {
  switch (code) {
    case 'EPERM':
      log(`A watched file or directory has invalid permissions: '${relative(process.cwd(), f || p)}'`)
      break

    case 'ENOENT':
      log(`A watched file or directory has been deleted: '${relative(process.cwd(), f || p)}'`)
      break

    default:
      log(`Watch error. ${code}: ${message}.`)
      break
  }
}
