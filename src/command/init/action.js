const inquirer = require('inquirer')
const path = require('path')
const { copyFileSync, mkdirSync, writeFileSync } = require('fs')

async function action() {
  const config = await getConfigFromUser()
  writeFileSync('tucker.json', JSON.stringify(config, null, '  '), 'utf8')
  mkdirSync('src')

  const template = path.resolve(__dirname, 'template.lisp')
  copyFileSync(template, 'src/main.lisp')
}

async function getConfigFromUser() {
  const { name, version, target } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Name',
      default: getFolderName()
    },
    {
      type: 'input',
      name: 'version',
      message: 'Version',
      default: '1.0.0'
    },
    {
      type: 'list',
      name: 'target',
      message: 'Target',
      choices: ['c', 'cxx', 'cuda', 'glsl', 'ocl']
    }
  ])

  const targetDefaults = getTargetDefaults(target)
  const { format, compiler } = await inquirer.prompt([
    {
      type: 'input',
      name: 'format',
      message: 'Formatter',
      default: targetDefaults.format
    },
    {
      type: 'input',
      name: 'compiler',
      message: 'Compiler',
      default: targetDefaults.compiler
    }
  ])

  return { name, version, target, format, compiler }
}

function getFolderName() {
  return process
    .cwd()
    .split('/')
    .pop()
}

function getTargetDefaults(target) {
  const defaults = {
    c: {
      format: 'clang-format',
      compiler: 'clang'
    },
    cxx: {
      format: 'clang-format',
      compiler: 'clang++'
    },
    cuda: {
      format: null,
      compiler: null
    },
    glsl: {
      format: null,
      compiler: null
    },
    ocl: {
      format: null,
      compiler: null
    }
  }
  return defaults[target]
}

module.exports = action
