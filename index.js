const express = require('express');
const { log } = require('./utils');
const config = require('./config');
const serve = require('./serve');
const app = express();

config.routes.forEach((route) => {
  if (!['post', 'get', 'put', 'delete', 'all'].includes(route.mode)) {
    log(`Invalid route mode: ${route.mode}. Skipping route.`, 'yellow');
  } else {
    if (config.debug) log(`Handling route ${route.path} with mode ${route.mode}`, 'green');

    // Handle the route
    app[route.mode](route.path, serve);
  }
});

log(`Server started and listening on localhost:${config.port}`, 'blue');
app.listen(config.port);