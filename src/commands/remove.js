'use strict'

module.exports = ({ logger, storage }) => ({
  command: 'remove <name>',
  describe: 'Removes the birthday for the storage',
  builder: yargs => yargs
    .example('remove "Dennis Skoko"')
    .positional('name', {
      describe: 'The name of the person',
      type: 'string'
    }),
  handler: ({ name }) => {
    storage.remove(name)
      .then(removed => {
        if (removed) logger.info('Successfully removed ' + name)
        else logger.info('Could not find a person with that name in the storage')
      })
      .catch(err => {
        logger.error('Failed to remove the person', {
          error: err.message
        })
      })
  }
})
