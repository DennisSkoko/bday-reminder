'use strict'

const putBirthday = require('./putBirthday')

async function handler(event) {
  if (!event.birthDate) throw new Error('`birthDate` is required')
  if (!event.name) throw new Error('`name` is required')
  if (!event.birthYear) throw new Error('`birthYear` is required')

  await putBirthday(event)
}

module.exports = handler
