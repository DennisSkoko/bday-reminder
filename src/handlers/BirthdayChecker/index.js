'use strict'

const getBirthdays = require('./getBirthdays')
const sendBirthdayNotification = require('./sendBirthdayNotification')

async function handler() {
  const birthdays = await getBirthdays()
  await Promise.all(birthdays.map(sendBirthdayNotification))
}

exports.handler = handler
