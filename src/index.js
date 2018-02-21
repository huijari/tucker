#!/usr/bin/env node

const program = require('commander')

const { init, build, run } = require('./command')

program.description('A system for building c-mera apps').version('1.0.0')

init.command(program)
build.command(program)
run.command(program)

program.parse(process.argv)
