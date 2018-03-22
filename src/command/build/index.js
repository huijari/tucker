const { readFileSync } = require('fs')
const { execSync } = require('child_process')

const transpile = require('../transpile')

function command(program) {
  program
    .command('build')
    .description('Compile the binary target')
    .action(action)
}

async function action() {
  await transpile.action()

  const config = JSON.parse(readFileSync('tucker.json'))
  const find = `find build -name "*.c"`
  const compiler = `${config.compiler} -o build/${config.name}`
  const command = `${find} | xargs ${compiler}`
  execSync(command)
}

module.exports = { action, command }
