'use strict'

const { CronJob } = require('cron')

module.exports = ({ settings, logger, storage }) => () =>
  new CronJob(Object.assign({}, settings.reminder, {
    onTick: () => {
      logger.verbose('Checking if there are any birthdays today')

      storage.get()
        .then(people => {
          // TODO: Check if anyone's birthday today
        })
        .catch(err => {
          logger.error(
            'Could not retrieve the birthdays from the storage',
            { message: err.message }
          )
        })
    }
  }))
