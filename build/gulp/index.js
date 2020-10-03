import gulp from 'gulp'
import debug from 'gulp-debug'
import vinylPaths from 'vinyl-paths'
import del from 'del'

import handleWatchError from './handle-watch-error'

import cssFromSass from './build/css-from-sass'

const CWD = process.cwd()

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
  gulp.watch('./src/fonts/**/*', { name: 'build-fonts-watch', cwd: CWD }, gulp.series(buildFontsClean, buildFonts))
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
      cwd: CWD
    },
    gulp.series(buildCssClean, buildCss)
  )
    .on('error', handleWatchError)
)
