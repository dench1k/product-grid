const env = require('dotenv').config();
const envExpand = require('dotenv-expand');

envExpand(env);

const path = require('path');

const {
  SASS_SRC_DIR, SASS_SRC_GLOB, SASS_FILE_EXTENSIONS, SASS_DEST_DIR,
} = process.env;

/**
 * @type {{srcDir: string, glob: string, fileExtensions: string, destDir: string, plugins: object}}
 */
module.exports = {
  srcDir: SASS_SRC_DIR || './src/sass',
  glob: SASS_SRC_GLOB || '**',
  fileExtensions: SASS_FILE_EXTENSIONS || 'scss',
  destDir: SASS_DEST_DIR || './web/css',
  plugins: {
    autoprefixer: {
      active: true,
      options: {
        // @see https://github.com/postcss/autoprefixer
        browsers: ['last 3 versions'],
      },
    },
    cleancss: {
      active: true,
      options: {
        // @see https://github.com/jakubpawlowicz/clean-css
        format: 'keep-breaks',
        sourceMap: true,
      },
    },
    sass: {
      options: {
        // @see https://github.com/sass/node-sass
        includePaths: ['./src/vendors/'],
        outputStyle: 'expanded',
        precision: 15,
      },
    },
    sourcemaps: {
      active: true,
      options: {
        // @see https://github.com/gulp-sourcemaps/gulp-sourcemaps
        includeContent: false,
        sourceRoot: path.relative(SASS_DEST_DIR || './web/css', SASS_SRC_DIR || './src/sass'),
      },
    },
  },
};
