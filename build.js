const { createConfiguration, build } = require('snowpack');
const config = require('./config');
const { log } = require('./utils');

let result = null;
module.exports = {
  result,

  // This will cal snowpack to generate builded files
  // into the ./build folder
  async generate() {
    try {
      const snowpackConfig = createConfiguration({...config.snowpack});
      const snowpackBuild = await build({ config: snowpackConfig });
      result = snowpackBuild.result;
    } catch (e) {
      log(e, 'red');
    }
  }
};