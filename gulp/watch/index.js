const gulp = require('gulp');
const mkdirp = require('mkdirp');
const path = require('path');
const runSequence = require('run-sequence');
const watch = require('gulp-watch');
const { logWatcherEvents } = require('../utils');
const { targets } = require('./config');

gulp.task('watch', () => {
  if (targets.length) {
    targets.forEach((target) => {
      if (target.task === 'copy') {
        const copyFrom = target.copyTargetsFrom;
        const copyTo = target.copyTargetsTo;

        copyFrom.forEach((p, i) => {
          mkdirp(copyTo[i]);

          logWatcherEvents(
            watch(p, () => {
              runSequence(target.task);
            }),
          );
        });
      } else {
        mkdirp(target.destDir);

        logWatcherEvents(
          watch(path.join(target.srcDir, target.glob, `*.${target.fileExtensions}`), () => {
            runSequence(target.task);
          }),
        );
      }
    });
  }
});
