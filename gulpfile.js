require('@babel/register')({
  ignore: [
    /node_modules/
  ]
})

const gulp = require('gulp')

const {
  buildFontsClean,
  buildFonts,
  buildFontsWatch,
  buildCssClean,
  buildCss,
  buildCssWatch
} = require('./build/gulp')

gulp
  .task('build:fonts:clean', buildFontsClean)

gulp
  .task('build:fonts', gulp.series('build:fonts:clean', buildFonts))

gulp
  .task('build:fonts:watch', gulp.series('build:fonts', buildFontsWatch))

gulp
  .task('build:css:clean', buildCssClean)

gulp
  .task('build:css', gulp.series('build:css:clean', buildCss))

gulp
  .task('build:css:watch', gulp.series('build:css', buildCssWatch))

gulp
  .task('build:clean', gulp.series('build:fonts:clean', 'build:css:clean'))

gulp
  .task('build', gulp.series('build:fonts', 'build:css'))

gulp
  .task('build:watch', gulp.parallel('build:fonts:watch', 'build:css:watch'))
