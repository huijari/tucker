function command(program) {
  program
    .command('build')
    .description('Compile the binary target')
    .action(action)
}

function action() {}

module.exports = { action, command }
