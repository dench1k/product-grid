const gulp = require('gulp');
const runSequence = require('run-sequence');
const { tasks } = require('./config');

gulp.task('serve', cb => runSequence(...tasks, cb));
