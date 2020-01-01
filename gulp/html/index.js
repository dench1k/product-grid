const debug = require('gulp-logger');
const gulp = require('gulp');
const path = require('path');
const plumber = require('gulp-plumber');
const rigger = require('gulp-rigger');
const bs = require('../bs');
const {
  srcDir, glob, fileExtensions, destDir,
} = require('./config');

gulp.task('html', () => gulp
  .src(path.join(srcDir, glob, `*.${fileExtensions}`))
  .pipe(plumber())
  .pipe(rigger())
  .pipe(
    debug({
      beforeEach: 'Compiled: ',
    }),
  )
  .pipe(gulp.dest(destDir))
  .pipe(bs.stream({ match: '**/*.html' })));
