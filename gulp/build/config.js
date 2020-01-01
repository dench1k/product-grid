const env = require('dotenv').config();
const envExpand = require('dotenv-expand');

envExpand(env);

const { BUILD_TASKS } = process.env;
const { toArray } = require('../utils');

/**
 * @type {{tasks: array}}
 */
module.exports = {
  tasks: BUILD_TASKS ? toArray(BUILD_TASKS) : ['html', 'sass', 'js', 'imagemin', 'copy'],
};
