const { readFileSync } = require('fs')

const transpile = require('./transpile')
const compile = require('./compile')

function command(program) {
  program
    .command('build')
    .description('Compile the binary target')
    .action(action)
}

async function action() {
  const config = JSON.parse(readFileSync('tucker.json'))
  await transpile(config)
  compile(config)
}

module.exports = { action, command }
