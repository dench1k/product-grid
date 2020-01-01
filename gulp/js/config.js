const env = require('dotenv').config();
const envExpand = require('dotenv-expand');

envExpand(env);

const {
  JS_SRC_DIR, JS_SRC_GLOB, JS_FILE_EXTENSIONS, JS_DEST_DIR,
} = process.env;

/**
 * @type {{srcDir: string, glob: string, fileExtensions: string, destDir: string}}
 */
module.exports = {
  srcDir: JS_SRC_DIR || './src/js',
  glob: JS_SRC_GLOB || '',
  fileExtensions: JS_FILE_EXTENSIONS || 'js',
  destDir: JS_DEST_DIR || './web/js',
};
