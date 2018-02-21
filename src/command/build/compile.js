const { execSync } = require('child_process')

function compile(config) {
  const find = `find build -name "*.c"`
  const compiler = `${config.compiler} -o build/${config.name}`
  const command = `${find} | xargs ${compiler}`
  execSync(command)
}

module.exports = compile