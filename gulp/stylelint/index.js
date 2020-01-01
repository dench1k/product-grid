const env = require('dotenv').config();
const envExpand = require('dotenv-expand');

envExpand(env);

const gulp = require('gulp');
const stylelint = require('gulp-stylelint');

const targets = process.env.STYLELINT_TARGETS || './src/sass/**/*.scss';

gulp.task('stylelint', () => gulp.src(targets).pipe(
  stylelint({
    reporters: [
      {
        formatter: 'string',
        console: true,
      },
    ],
    failAfterError: false,
  }),
));
