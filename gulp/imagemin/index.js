const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const path = require('path');
const pngquant = require('imagemin-pngquant');
const bs = require('../bs');
const {
  srcDir, glob, fileExtensions, destDir, plugins,
} = require('./config');

gulp.task('imagemin', () => gulp
  .src(path.join(srcDir, glob, `*.${fileExtensions}`))
  .pipe(newer(destDir))
  .pipe(
    imagemin([
      imagemin.gifsicle(plugins.gifscale.options),
      imagemin.jpegtran(plugins.jpegtran.options),
      imagemin.svgo(plugins.svgo.options),
      pngquant(plugins.pngquant.options),
    ]),
  )
  .pipe(gulp.dest(destDir))
  .pipe(bs.stream({ match: '**/*.{gif,jpg,png,svg}' })));
