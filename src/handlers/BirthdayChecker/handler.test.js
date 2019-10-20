'use strict'

const getBirthdays = require('./getBirthdays')
const handler = require('./handler')
const sendBirthdayNotification = require('./sendBirthdayNotification')

jest.mock('./getBirthdays')
jest.mock('./sendBirthdayNotification')

it('sends notification for each birthdays', async () => {
  getBirthdays.mockResolvedValueOnce([
    { name: 'Foo', birthdate: '2019-10-20' },
    { name: 'Bar', birthdate: '2019-10-20' },
    { name: 'Biz', birthdate: '2019-10-20' }
  ])

  await handler()

  expect(sendBirthdayNotification).toHaveBeenCalledTimes(3)
})

it('does nothing if there are no birthdays', async () => {
  getBirthdays.mockResolvedValueOnce([])

  await handler()

  expect(sendBirthdayNotification).not.toHaveBeenCalled()
})
