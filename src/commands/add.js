'use strict'

const validate = (month, day) => {
  if (month > 12) throw new Error('Invalid month, must be between: 1-12')
  if (day > 31) throw new Error('Invalid day, must be between: 1-31')
}

module.exports = () => ({
  command: 'add <name> <month> <day>',
  describe: 'Adds the birthday within the storage',
  builder: yargs => yargs
    .positional('name', {
      describe: 'The name of the person',
      type: 'string'
    })
    .positional('month', {
      describe: 'Which month of the birthday date',
      type: 'number'
    })
    .positional('day', {
      describe: 'Which day of the birthday date',
      type: 'number'
    }),
  handler: ({ name, month, day }) => {
    validate(month, day)
  }
})
