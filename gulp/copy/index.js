const debug = require('gulp-logger');
const gulp = require('gulp');
const merge = require('merge-stream');
const newer = require('gulp-newer');
const path = require('path');
const bs = require('../bs');
const { copyTargetsFrom, copyTargetsTo } = require('./config');

gulp.task('copy', () => {
  const streams = [];

  for (let i = 0; i < copyTargetsFrom.length; i += 1) {
    streams.push(
      gulp
        .src([copyTargetsFrom[i], `!${path.join(copyTargetsFrom[i], 'README.md')}`])
        .pipe(newer(copyTargetsTo[i]))
        .pipe(gulp.dest(copyTargetsTo[i]))
        .pipe(
          debug({
            beforeEach: 'Copied: ',
          }),
        )
        .pipe(bs.stream()),
    );
  }

  return merge(streams);
});
