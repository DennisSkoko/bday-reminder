'use strict'

module.exports = ({ logger, storage }) => ({
  command: 'add <name> <date>',
  describe: 'Adds the birthday within the storage',
  builder: yargs => yargs
    .example('add "Dennis Skoko" 1996-01-19')
    .positional('name', {
      describe: 'The name of the person',
      type: 'string'
    })
    .positional('date', {
      describe: 'Which month of the birthday date',
      type: 'string'
    }),
  handler: ({ name, date }) => {
    storage.add({ name, date: new Date(date) })
      .then(() => {
        logger.info('User has been added')
      })
      .catch(err => {
        logger.error('Failed to add the person', {
          error: err.message
        })
      })
  }
})
