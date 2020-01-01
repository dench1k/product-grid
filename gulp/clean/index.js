const del = require('del');
const gulp = require('gulp');
const { cleanTargets } = require('./config');
const { logEvent } = require('../utils');

gulp.task('clean', () => del(cleanTargets).then((paths) => {
  if (paths.length) {
    paths.forEach((p) => {
      logEvent('Deleted:', p);
    });
  }
}));
