import gulp from 'gulp'
import dartSass from 'dart-sass'
import gulpSass from 'gulp-sass'
import debug from 'gulp-debug'

import postCss from 'gulp-postcss'
import scss from 'postcss-scss'
import autoprefixer from 'autoprefixer'
import nano from 'cssnano'
import cleanCss from 'gulp-clean-css'
import cssPurge from 'gulp-css-purge'
import sourcemaps from 'gulp-sourcemaps'

const sass = gulpSass(dartSass)

const getTransformForSass = () => (
  sass({
    outputStyle: 'compressed' // 'nested'
  }).on('error', sass.logError)
)

const getTransformForPostCss = () => (
  postCss([
    autoprefixer(),
    nano()
  ], { syntax: scss })
)

const getTransformForCleanCss = () => (
  cleanCss({
    format: 'beautify',
    compatibility: 'ie9',
    specialComments: 0
  })
)

const getTransformForCssPurge = () => (
  cssPurge({
    trim: false, // we have chosen to beautify not minify in cleanCSS so let's not minify here
    trim_last_semicolon: true, // cleanCSS does this for us (cssPurge puts it back unless we prevent it, here)
    shorten: false, // 'true' kills some inline '<svg />' elements
    format: false,
    verbose: false
  })
)

const cssFromSass = () => (
  gulp.src(['./src/sass/**/*.*']) // , '!./src/sass/**/_*.*'])
    .pipe(sourcemaps.init())
    .pipe(getTransformForSass())
    .pipe(getTransformForPostCss())
    .pipe(getTransformForCleanCss())
    .pipe(getTransformForCssPurge())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./pub/assets/css'))
    .pipe(debug({ title: 'CSS' }))
)

export default cssFromSass
