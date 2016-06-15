#!/usr/bin/env node
'use strict'

const Liftoff = require('liftoff')
const chalk = require('chalk')
const pkg = require('../package.json')
const argv = require('minimist')(process.argv.slice(2))
const sh = require('shelljs')

sh.config.silent = true

let cli = new Liftoff({
  name: 'lego',
  processTitle: 'lego',
  configName: 'legofile',
  extensions: { ".js":null, ".json":null },
  v8flags: ['--harmony']
})

cli.launch({
  configPath: argv.legofile
}, (env) => {

  const cmd = argv._[0]
  const minior = argv._[1]
  let ret = {}
  switch (cmd) {
    case 'version':
      console.log(cli.name, chalk.blue(pkg.version))
      break
    case 'init':
      const branch = minior || 'master'
      ret = sh.exec(`git clone git@github.com:tvrcgo/lego.git -b ${branch} lego-init`)
      if (!ret.code) {
        console.log(chalk.green('Lego init finished.'))
      }
      break
    case undefined:
      sh.exit(0)
      break
    default:
      console.error(chalk.red('Unknow command', cmd))
      sh.exit(0)
  }

  if (ret.code) {
    console.error(chalk.red('[ERROR]', ret.stderr))
  }

})
