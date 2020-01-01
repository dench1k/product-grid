const env = require('dotenv').config();
const envExpand = require('dotenv-expand');

envExpand(env);

const { BS_BASE_DIR, BS_START_PATH } = process.env;

/**
 * @type {{options: object}}
 */
module.exports = {
  options: {
    // @see https://browsersync.io/docs/options
    notify: true,
    open: true,
    server: {
      baseDir: BS_BASE_DIR || './',
    },
    startPath: BS_START_PATH || '/web',
    scrollProportionally: false,
  },
};
