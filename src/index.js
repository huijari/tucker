#!/usr/bin/env node

const program = require('commander')

const { init, transpile, build, run } = require('./command')

program.description('A system for building c-mera apps').version('2.0.0')

init.command(program)
transpile.command(program)
build.command(program)
run.command(program)

program.parse(process.argv)
