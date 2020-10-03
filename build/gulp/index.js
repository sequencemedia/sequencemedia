import gulp from 'gulp'
import debug from 'gulp-debug'
import vinylPaths from 'vinyl-paths'
import del from 'del'

import cssFromSass from './css-from-sass'

import handleWatchError from './handle-watch-error'

export const buildFontsClean = () => (
  gulp.src('./pub/assets/fonts/*', { read: false })
    .pipe(vinylPaths((paths) => del(paths, { force: true })))
)

export const buildFonts = () => (
  gulp.src(['./src/fonts/**/*.*'])
    .pipe(gulp.dest('./pub/assets/fonts'))
    .pipe(debug({ title: 'Fonts' }))
)

export const buildFontsWatch = () => (
  gulp.watch('./src/fonts/**/*', { name: 'build-fonts-watch', cwd: process.cwd() }, gulp.series(buildFontsClean, buildFonts))
    .on('error', handleWatchError)
)

export const buildCssClean = () => (
  gulp.src('./pub/assets/css/*', { read: false })
    .pipe(vinylPaths((paths) => del(paths, { force: true })))
)

export const buildCss = gulp.series(cssFromSass)

export const buildCssWatch = () => (
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
