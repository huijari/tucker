const { readFileSync } = require('fs')
const { execSync } = require('child_process')

const build = require('../build')

function command(program) {
  program
    .command('run')
    .description('Compile and run the binary target')
    .action(action)
}

async function action() {
  await build.action()

  const { name } = JSON.parse(readFileSync('tucker.json'))
  const command = `./build/${name}`
  execSync(command, { stdio: 'inherit' })
}

module.exports = { action, command }
