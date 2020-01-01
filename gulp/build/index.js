const gulp = require('gulp');
const runSequence = require('run-sequence');
const { tasks } = require('./config');

gulp.task('build', cb => runSequence(...tasks, cb));
