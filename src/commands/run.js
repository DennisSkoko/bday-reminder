'use strict'

module.exports = () => ({
  command: 'run',
  describe: 'Starts a process that will send emails when birthdays are coming up',
  handler: argv => {
    console.log('Running')
  }
})
