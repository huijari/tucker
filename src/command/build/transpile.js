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

async function transpile() {
  const config = JSON.parse(readFileSync('tucker.json'))

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
    const filter = config.format ? `| ${config.format}` : ''
    const to = filename(file, config)
    const command = `cm ${config.target} ${file} ${filter} > ${to}`
    execSync(command)
  } else copyFileSync(file, buildPath(file))
}

function filename(file, { target }) {
  const name = buildPath(file).replace(/.lisp$/, '')
  if (/\..*/.test(name)) return name

  return `${name}.${extension(target)}`
}

function extension(target) {
  const extensions = {
    c: 'c',
    cxx: 'cpp',
    glsl: '',
    cuda: '',
    ocl: ''
  }
  return extensions[target]
}

module.exports = transpile
