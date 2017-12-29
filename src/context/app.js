'use strict'

const yargs = require('yargs')

module.exports = ({ settings, storage, commands }) => () =>
  storage.init()
    .then(() => {
      yargs
        .version(settings.version)
        .command(commands.add)
        .command(commands.run)
        .demandCommand()
        .parse()
    })
    .catch(console.error)
