const env = require('dotenv').config();
const envExpand = require('dotenv-expand');

envExpand(env);

const eslint = require('gulp-eslint');
const gulp = require('gulp');

const targets = process.env.ESLINT_TARGETS || './src/js/**/*.js';

gulp.task('eslint', () => gulp
  .src(targets)
  .pipe(eslint())
  .pipe(eslint.format()));
