import gulp from '@sequencemedia/gulp'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import debug from '@sequencemedia/gulp-debug'

import postCss from 'gulp-postcss'
import scss from 'postcss-scss'
import autoprefixer from 'autoprefixer'
import nano from 'cssnano'
import cleanCss from 'gulp-clean-css'
import cssPurge from 'gulp-css-purge'
import sourcemaps from 'gulp-sourcemaps'

const sass = gulpSass(dartSass)

function getTransformForSass () {
  return (
    sass({
      outputStyle: 'compressed' // 'nested'
    }).on('error', sass.logError)
  )
}

function getTransformForPostCss () {
  return (
    postCss([
      autoprefixer(),
      nano()
    ], { syntax: scss })
  )
}

function getTransformForCleanCss () {
  return (
    cleanCss({
      format: 'beautify',
      compatibility: 'ie9',
      specialComments: 0
    })
  )
}

function getTransformForCssPurge () {
  return (
    cssPurge({
      trim: false, // we have chosen to beautify not minify in cleanCSS so let's not minify here
      trim_last_semicolon: true, // cleanCSS does this for us (cssPurge puts it back unless we prevent it, here)
      shorten: false, // 'true' kills some inline '<svg />' elements
      format: false,
      verbose: false
    })
  )
}

function cssFromSass () {
  return (
    gulp.src('./src/sass/**/*.*') // (['./src/sass/**/*.*', '!./src/sass/**/_*.*'])
      .pipe(sourcemaps.init())
      .pipe(getTransformForSass())
      .pipe(getTransformForPostCss())
      .pipe(getTransformForCleanCss())
      .pipe(getTransformForCssPurge())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./pub/assets/css'))
      .pipe(debug({ title: 'CSS' }))
  )
}

export default cssFromSass
