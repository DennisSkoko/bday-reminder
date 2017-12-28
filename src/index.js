'use strict'

const loader = require('./util/context-loader')
const yargs = require('yargs')

const modules = [
  { name: 'settings', path: '../conf/app' },
  {
    path: 'commands',
    modules: [
      { path: 'add' },
      { path: 'run' }
    ]
  }
]

module.exports = () => {
  const ctx = loader(modules)

  yargs
    .version(ctx.settings.version)
    .command(ctx.commands.add)
    .command(ctx.commands.run)
    .parse()
}
