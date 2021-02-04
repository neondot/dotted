const fs = require('fs');
const { log } = require('./utils');

module.exports = (request, response) => {
  const url = request.baseUrl.length > 0 ? request.baseUrl : '/';
  log(`Requested: '${url}' with mode '${request.method}'`, 'blue');

  try {
    const indexContent = fs.readFileSync(`/build/index.html`).toString();
    // Fill the index content with layout defined in route and then ssr-render the route
    // append it to the layout and send the response
    response.send(indexContent).end();
  } catch (e) {
    log(`No index.html defined for url '${url}'`, 'red');
    // Replace the error message with an error custom layout
    response.status(500).send(JSON.stringify(e));
  }
};
