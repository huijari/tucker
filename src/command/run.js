function command(program) {
  program
    .command('run')
    .description('Compile and run the binary target')
    .action(action)
}

function action() {}

module.exports = { action, command }
