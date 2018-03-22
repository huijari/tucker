const action = require('./action')

function command(program) {
  program
    .command('transpile')
    .description('Transpile code for the target language')
    .action(action)
}

module.exports = command
