'use strict'

const fs = require('fs-extra')

module.exports = ({ settings }) => () =>
  fs.ensureFile(settings.storage.path)
    .then(() => fs.readFile(settings.storage.path, settings.storage.encoding))
    .then(data => {
      if (data === '') return fs.writeFile(settings.storage.path, '[]\n')
    })
