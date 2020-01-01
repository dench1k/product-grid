const env = require('dotenv').config();
const envExpand = require('dotenv-expand');

envExpand(env);

const { CLEAN_TARGETS } = process.env;
const { toArray } = require('../utils');

/**
 * @type {{cleanTargets: array}}
 */
module.exports = {
  cleanTargets: CLEAN_TARGETS ? toArray(CLEAN_TARGETS) : ['./web/*'],
};
