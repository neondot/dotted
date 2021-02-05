const express = require('express');
const { log } = require('./utils');
const config = require('./config');
const serve = require('./serve');
const build = require('./build');
const app = express();

(async function dotted() {
  await build.generate();
  
  // Use build folder as static assets
  app.use(express.static('build'));

  // Handle all routes with generic serve function
  app.all('/*', serve);
  
  log(`Server started and listening on localhost:${config.port}`, 'blue');
  app.listen(config.port);
})();