const transpile = require('./transpile')

function command(program) {
  program
    .command('build')
    .description('Compile the binary target')
    .action(action)
}

function action() {
  transpile()
}

module.exports = { action, command }
