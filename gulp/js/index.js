const babel = require('gulp-babel');
const debug = require('gulp-logger');
const gulp = require('gulp');
const path = require('path');
const plumber = require('gulp-plumber');
const bs = require('../bs');
const {
  srcDir, glob, fileExtensions, destDir,
} = require('./config');

gulp.task('js', () => gulp
  .src(path.join(srcDir, glob, `*.${fileExtensions}`))
  .pipe(plumber())
  .pipe(
    babel({
      presets: ['@babel/env'],
    }),
  )
  .pipe(
    debug({
      beforeEach: 'Compiled: ',
    }),
  )
  .pipe(gulp.dest(destDir))
  .pipe(bs.stream({ match: '**/*.js' })));
