const { log } = require('./utils');

module.exports = (request, response) => {
  log(`Requested: ${request.baseUrl.length > 0 ? request.baseUrl : '/'} with mode ${request.method}`, 'blue');
  response.end();
};
