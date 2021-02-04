const chalk = require('chalk');
const express = require('express');
const app = express();
const serve = require('./serve');

let userConfig = {};
try {
  userConfig = require('config.dotted.js');
} catch (e) {
  console.log(chalk.yellow("❯ No user configuration found. Using defaults."));
}
const defaults = require('./defaults.dotted');
const config = { ...userConfig, ...defaults };
if (config.debug) console.log(chalk.green(`❯ ${JSON.stringify(config)}`));

config.routes.forEach((route) => {
  if (!['post', 'get', 'put', 'delete', 'all'].includes(route.mode)) {
    console.log(chalk.yellow(`❯ Invalid route mode: ${route.mode}. Skipping route.`));
  } else {
    if (config.debug) console.log(chalk.green(`❯ Handling route ${route.path} with mode ${route.mode}`));

    // Handle the route
    app[route.mode](route.path, serve);
  }
});

console.log(chalk.blue("❯ Server started and listening on localhost:3000"));
app.listen(config.port);