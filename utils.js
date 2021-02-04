const chalk = require('chalk')

module.exports = {
  log(string, color = 'blue') {
    console.log(chalk[color](`❯ ${string}`));
  }
}