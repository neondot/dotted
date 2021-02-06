const fs = require('fs');
const path = require('path');
const { getServer, getRuntime } = require('./build');
const config = require('./config');
const { log } = require('./utils');

module.exports = async (request, response) => {
  const url = request.path.length > 0 ? request.path : '/';
  log(`Requested route path: '${url}' with mode '${request.method}'`, 'blue');
  
  try {
    const server = getServer();
    const file = await server.loadUrl(request.path);
    response
      .header('Content-Type', file.contentType)
      .send(file.contents.toString())
      .end();
    return;
  } catch (e) {
    log(`Requested path ${request.path} not handled by snowpack. Moving on`, 'yellow');
  };

  // If we are here no static file is requested and we are
  // trying to navigate a dot url
  try {
    const indexContent = fs.readFileSync(path.resolve('./templates/index.html')).toString();

    // Load the application router
    // const runtime = getRuntime();
    // const routes = (await runtime.importModule('/app.js')).exports.router;
    // console.log(routes);

    // Fill the index content with layout defined in route and then ssr-render the route
    // append it to the layout and send the response
    filledContent = indexContent
      .replace(/(\:title\:)/gi, config.head.title)
      .replace(/(\:hrm_port\:)/gi, config.snowpack.devOptions.hmrPort)
      .replace(/:ssr_build:/gi, ''); // TODO replace with the html obtained from some kind of build

    // Send back the filled response
    response.send(filledContent).end();
  } catch (e) {
    log(e.stack, 'red');
    // Replace the error message with an error custom layout
    response.status(500).send(JSON.stringify(e));
  }
};
