'use strict'

module.exports = ({ reminder }) => ({
  command: 'run',
  describe: 'Starts a process that will send emails when birthdays are coming up',
  handler: argv => {
    reminder()
  }
})
