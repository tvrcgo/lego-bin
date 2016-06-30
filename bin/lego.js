#!/usr/bin/env node
'use strict'

const path = require('path')
const Liftoff = require('liftoff')
const chalk = require('chalk')
const moment = require('moment')
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

  const major = argv._[0]
  const minior = argv._[1]
  let ret = {}
  switch (major) {
    case 'version':
      console.log(cli.name, chalk.blue(pkg.version))
      break
    case 'init':
      const branch = argv.b || 'master'
      const proj = minior || 'lego-init'
      ret = sh.exec(`git clone git@github.com:tvrcgo/lego.git -b ${branch} lego-init`)
      if (!ret.code) {
        console.log(chalk.green('Lego init finished.'))
      }
      break
    case 'build':
      const buildConfig = path.resolve(__dirname, '../config/webpack.config.build.js')
      const watch = argv.watch ? '--watch' : ''
      sh.exec(`webpack -d --config=${buildConfig} ${watch} --colors --progress`, { silent: false })
      break
    case 'release':
      const distConfig = path.resolve(__dirname, '../config/webpack.config.dist.js')
      sh.exec(`webpack -d --config=${distConfig} --colors --progress`, { silent: false })
      sh.exec(`cd dist && npm i --production`, { silent: false })
      const tarPkg = require(path.join(process.cwd(), '/package.json'))
      const packName = [tarPkg.name, 'v'+tarPkg.version, moment().format('YYYYMMDDHHmm')].join('_')
      break
    case 'clean':
      if (/win32/.test(process.platform)) {
        ret = sh.exec(`rd .build /s/q`)
      }
      else if (/(darwin|linux)/.test(process.platform)) {
        ret = sh.exec(`rm .build -rf`)
      }
      else {
        console.warn('Unknown platform', process.platform)
        sh.exit(0)
      }
      break
    case 'start':
      ret = sh.exec(`cd .build &&node app/index.js --colors`, { silent: false, stdio: "inherit" })
      break
    case undefined:
      sh.exit(0)
      break
    default:
      console.error(chalk.red('Unknow command', major))
      sh.exit(0)
  }

  if (ret.code) {
    console.error(chalk.red('[ERROR]', ret.stderr))
  }

})
