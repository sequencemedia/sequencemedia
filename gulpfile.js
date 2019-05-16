require('dotenv/config')
require('module-alias/register')
require('@babel/register')({
  cwd: __dirname,
  ignore: [
    /node_modules/
  ]
})

const gulp = require('gulp')

const {
  buildCssClean,
  buildCss,
  buildCssWatch
} = require('build/gulp')

gulp
  .task('build:css:clean', buildCssClean)

gulp
  .task('build:css', gulp.series('build:css:clean', buildCss))

gulp
  .task('build:css:watch', gulp.series('build:css', buildCssWatch))
