'use strict'

module.exports = ({ logger, storage, job, mail }) => ({
  command: 'run',
  describe: 'Starts a process that will send emails when birthdays are coming up',
  handler: argv => {
    logger.info('Process started')

    job(() => {
      logger.verbose('Checking if there are any birthdays today')

      storage.get()
        .then(people => {
          const today = new Date()

          people.forEach(person => {
            person.date = new Date(person.date)

            if (person.date.getMonth() === today.getMonth() &&
              person.date.getDate() === today.getDate()) {
              mail({
                name: person.name,
                age: today.getYear() - person.date.getYear()
              })
                .then(() => {
                  logger.verbose('Successfuly sent a mail about a birthday', {
                    name: person.name
                  })
                })
                .catch(err => {
                  logger.error('Could not send mail', { message: err.message })
                })
            }
          })
        })
        .catch(err => {
          logger.error(
            'Could not retrieve the birthdays from the storage',
            { message: err.message }
          )
        })
    })
  }
})
