const gulp = require('gulp');
const bs = require('../bs');
const { options } = require('./config');

gulp.task('sync', () => bs.init(options));
