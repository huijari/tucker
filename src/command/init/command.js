const action = require('./action')

function command(program) {
  program
    .command('init')
    .description('Initialize a new tucker project')
    .action(action)
}

module.exports = action