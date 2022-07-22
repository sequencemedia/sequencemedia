import gulp from 'gulp'
import debug from 'gulp-debug'
import vinylPaths from 'vinyl-paths'
import {
  deleteAsync as del
} from 'del'

import cssFromSass from '#build/gulp/css-from-sass'
import handleWatchError from '#build/gulp/handle-watch-error'

export function buildFontsClean () {
  return (
    gulp.src('./pub/assets/fonts/*', { read: false })
      .pipe(vinylPaths((paths) => del(paths, { force: true })))
  )
}

export function buildFonts () {
  return (
    gulp.src(['./src/fonts/**/*.*'])
      .pipe(gulp.dest('./pub/assets/fonts'))
      .pipe(debug({ title: 'Fonts' }))
  )
}

export function buildFontsWatch () {
  return (
    gulp.watch('./src/fonts/**/*', { name: 'build-fonts-watch', cwd: process.cwd() }, gulp.series(buildFontsClean, buildFonts))
      .on('error', handleWatchError)
  )
}

export function buildCssClean () {
  return (
    gulp.src('./pub/assets/css/*', { read: false })
      .pipe(vinylPaths((paths) => del(paths, { force: true })))
  )
}

export const buildCss = gulp.series(cssFromSass)

export function buildCssWatch () {
  return (
    gulp.watch(
      [
        './src/sass/**/*',
        './src/fonts/**/*'
      ],
      {
        name: 'build-css-watch',
        cwd: process.cwd()
      },
      gulp.series(buildCssClean, buildCss)
    )
      .on('error', handleWatchError)
  )
}
