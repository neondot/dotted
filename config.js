const { log } = require('./utils');

let userConfig = {};
try {
  userConfig = require('config.dotted.js');
} catch (e) {
  log('No user configuration found. Using defaults.', 'yellow');
}
const defaults = require('./defaults.dotted');
const config = { ...userConfig, ...defaults };
if (config.debug) log(JSON.stringify(config), 'green');

module.exports = config;