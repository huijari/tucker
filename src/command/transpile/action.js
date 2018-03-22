const {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync
} = require('fs')
const { promisify } = require('util')
const { execSync } = require('child_process')
const rmdir = require('rimraf')

async function action() {
  const config = JSON.parse(readFileSync('tucker.json'))
  await transpile(config)
}

async function transpile(config) {
  if (existsSync('build')) await promisify(rmdir)('build')
  mkdirSync('build')
  folder('src', config)
}

function folder(path, config) {
  const files = readdirSync(path).map(name => `${path}/${name}`)
  for (file of files) {
    if (isDirectory(file)) {
      mkdirSync(buildPath(path))
      folder(file, config)
    } else processFile(file, config)
  }
}

function isDirectory(path) {
  return statSync(path).isDirectory()
}

function buildPath(path) {
  return file.replace(/^src/, 'build')
}

function processFile(file, config) {
  if (file.endsWith('.lisp')) {
    const filter = config.transpile.formatter
      ? `| ${config.transpile.formatter}`
      : ''
    const to = filename(file, config)
    const flags = config.transpile.flags ? config.transpile.flags : ''
    const command = `${config.transpile.exec} ${flags} ${file} ${filter} > ${to}`
    execSync(command)
  } else copyFileSync(file, buildPath(file))
}

function filename(file, { transpile }) {
  const name = buildPath(file).replace(/.lisp$/, '')
  if (/\..*/.test(name)) return name

  return `${name}.${transpile.extension}`
}

module.exports = action
