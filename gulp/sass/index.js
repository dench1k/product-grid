const autoprefixer = require('autoprefixer');
const cleancss = require('gulp-clean-css');
const debug = require('gulp-logger');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const path = require('path');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const bs = require('../bs');
const {
  srcDir, glob, fileExtensions, destDir, plugins,
} = require('./config');

gulp.task('sass', () => gulp
  .src(path.join(srcDir, glob, `*.${fileExtensions}`))
  .pipe(plumber())
  .pipe(gulpif(plugins.sourcemaps.active, sourcemaps.init()))
  .pipe(sass.sync(plugins.sass.options))
  .pipe(gulpif(plugins.autoprefixer.active, postcss([autoprefixer(plugins.autoprefixer.options)])))
  .pipe(gulpif(plugins.cleancss.active, cleancss(plugins.cleancss.options)))
  .pipe(gulpif(plugins.sourcemaps.active, sourcemaps.write('.', plugins.sourcemaps.options)))
  .pipe(
    debug({
      beforeEach: 'Compiled: ',
    }),
  )
  .pipe(plumber.stop())
  .pipe(gulp.dest(destDir))
  .pipe(bs.stream({ match: '**/*.css' })));
