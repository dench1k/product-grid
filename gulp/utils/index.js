const { gray, yellow } = require('chalk');
const path = require('path');
const { log } = require('gulp-util');

/**
 * @param {string} p
 */
const getRelativePath = p => path.relative(process.cwd(), p);

/**
 * @param {string} str
 */
const toArray = str => str.split(/\s*,\s*/);

/**
 * @param {string} event
 * @param {string} p
 */
const logEvent = (event, p) => log(`${yellow(event)} ${gray(getRelativePath(p))}`);

/**
 * @param {object} watcher
 */
const logWatcherEvents = (watcher) => {
  watcher
    .on('add', (file) => {
      logEvent('Added:', file);
    })
    .on('change', (file) => {
      logEvent('Changed:', file);
    })
    .on('unlink', (file) => {
      logEvent('Deleted:', file);
    });
};

module.exports = {
  logEvent,
  logWatcherEvents,
  toArray,
};
