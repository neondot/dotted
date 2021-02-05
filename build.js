const fs = require('fs');
const path = require('path');
const { createConfiguration, build } = require('snowpack');
const config = require('./config');
const { log } = require('./utils');

module.exports = {
  result: null,
  routes: new Map(),

  // This will cal snowpack to generate builded files
  // into the ./build folder
  async generate() {
    try {
      // Use the snowpack build pipeline to generate the assets
      log('Starting snowpack build. Snowpack output will follow', 'blue');
      const snowpackConfig = createConfiguration({...config.snowpack});
      const snowpackBuild = await build({ config: snowpackConfig });
      this.result = snowpackBuild.result;
      log('Build done', 'green');

      // Load all the routes based on the export of the
      // files in the build pages folder
      const pagesFiles = fs.readdirSync(path.resolve(`./build/${config.pagesPath}`));
      const pagesModules = [];
      pagesFiles.forEach((page) => {
        log(`Loading file ${page}`, 'blue');
        pagesModules.push(require(path.resolve(`./build/${config.pagesPath}/${page}`)));
      });
      
      // Convert the pages modules into instances and then
      // into routes with associated module
      pagesModules.forEach((Page) => {
        const instance = new Page();
        this.routes.set(instance.$path, instance);
      });
    } catch (e) {
      log(e, 'red');
    }
  }
};