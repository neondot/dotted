const fs = require('fs');
const path = require('path');
const build = require('./build');
const config = require('./config');
const { log } = require('./utils');

module.exports = (request, response) => {
  const url = request.path.length > 0 ? request.path : '/';
  log(`Requested route path: '${url}' with mode '${request.method}'`, 'blue');

  // If we are here no static file is requested and we are
  // trying to navigate a dot url
  try {
    const indexContent = fs.readFileSync(path.resolve('./templates/index.html')).toString();

    // Fill the index content with layout defined in route and then ssr-render the route
    // append it to the layout and send the response
    filledContent = indexContent
      .replace(/(\:title\:)/gi, config.head.title)
      .replace(/(\:hrm_port\:)/gi, config.snowpack.devOptions.hmrPort)
      .replace(/:ssr_build:/gi, build.routes.get(url).$template);

    // Send back the filled response
    response.send(filledContent).end();
  } catch (e) {
    log(`No index.html defined for url '${url}'`, 'red');
    // Replace the error message with an error custom layout
    response.status(500).send(JSON.stringify(e));
  }
};
