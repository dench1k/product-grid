const env = require('dotenv').config();
const envExpand = require('dotenv-expand');

envExpand(env);

const { SERVE_TASKS } = process.env;
const { toArray } = require('../utils');

/**
 * @type {{tasks: array}}
 */
module.exports = {
  tasks: SERVE_TASKS ? toArray(SERVE_TASKS) : ['build', 'watch', 'sync'],
};
