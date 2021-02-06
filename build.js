const { createConfiguration, startServer } = require('snowpack');
const config = require('./config');
const { log } = require('./utils');

let server = null;
let runtime = null;

module.exports = {
  // This will cal snowpack to generate builded files
  // into the ./build folder
  async start() {
    try {
      log('Starting snowpack server. Snowpack output will follow', 'blue');
      const snowpackConfig = createConfiguration({...config.snowpack});
      snowpackConfig.devOptions.open = 'none';
      snowpackConfig.devOptions.output = 'stream';
      server = await startServer({ config: snowpackConfig });
      runtime = server.getServerRuntime();
      log('Build done', 'green');
    } catch (e) {
      log(e, 'red');
    }
  },

  getServer() {
    return server;
  },

  getRuntime() {
    return runtime;
  }
};