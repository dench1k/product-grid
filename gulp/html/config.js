const env = require('dotenv').config();
const envExpand = require('dotenv-expand');

envExpand(env);

const {
  HTML_SRC_DIR, HTML_SRC_GLOB, HTML_FILE_EXTENSIONS, HTML_DEST_DIR,
} = process.env;

/**
 * @type {{srcDir: string, glob: string, fileExtensions: string, destDir: string}}
 */
module.exports = {
  srcDir: HTML_SRC_DIR || './src/html',
  glob: HTML_SRC_GLOB || '',
  fileExtensions: HTML_FILE_EXTENSIONS || 'html',
  destDir: HTML_DEST_DIR || './web',
};
