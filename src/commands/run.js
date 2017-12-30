'use strict'

module.exports = ({ logger, storage, job }) => ({
  command: 'run',
  describe: 'Starts a process that will send emails when birthdays are coming up',
  handler: argv => {
    job(() => {
      logger.verbose('Checking if there are any birthdays today')

      storage.get()
        .then(people => {
          const today = new Date()

          people.forEach(person => {
            person.date = new Date(person.date)

            if (person.date.getMonth() === today.getMonth() &&
              person.date.getDate() === today.getDate()) {
              logger.info('It is ' + person.name + ' birthday today!')
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
