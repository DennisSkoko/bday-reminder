'use strict'

module.exports = ({ settings, logger, fs }) => ({
  init: () =>
    fs.ensureFile(settings.storage.path)
      .then(() => fs.readFile(settings.storage.path, settings.storage.encoding))
      .then(data => {
        if (data === '') {
          logger.verbose('Created the storage file')
          return fs.writeFile(settings.storage.path, '[]\n')
        }
      }),

  get: () => fs.readJson(settings.storage.path),

  add: person => fs.readJson(settings.storage.path)
    .then(people => {
      people.push(person)
      return fs.writeJson(settings.storage.path, people, { spaces: 2 })
    })
})
