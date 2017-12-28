'use strict'

const fs = require('fs-extra')

module.exports = ({ settings, logger }) => () =>
  fs.ensureFile(settings.storage.path)
    .then(() => fs.readFile(settings.storage.path, settings.storage.encoding))
    .then(data => {
      if (data === '') {
        logger.verbose('Created the storage file')
        return fs.writeFile(settings.storage.path, '[]\n')
      }
    })
