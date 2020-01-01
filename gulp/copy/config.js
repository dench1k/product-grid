const env = require('dotenv').config();
const envExpand = require('dotenv-expand');

envExpand(env);

const { COPY_TARGETS_FROM, COPY_TARGETS_TO } = process.env;
const { toArray } = require('../utils');

/**
 * @type {{copyTargetsFrom: array, copyTargetsTo: array}}
 */
module.exports = {
  copyTargetsFrom: COPY_TARGETS_FROM ? toArray(COPY_TARGETS_FROM) : ['./src/fonts/**', './src/vendors/**'],
  copyTargetsTo: COPY_TARGETS_TO ? toArray(COPY_TARGETS_TO) : ['./web/fonts', './web/vendors'],
};
