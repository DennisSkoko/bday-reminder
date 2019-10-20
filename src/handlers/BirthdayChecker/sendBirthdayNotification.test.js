'use strict'

const SNS = require('aws-sdk/clients/sns')
const sendBirthdayNotification = require('./sendBirthdayNotification')

jest.mock('aws-sdk/clients/sns')

const { mockPublish } = SNS

it('publishes to the TOPIC_ARN_BIRTHDAY value', async () => {
  mockPublish.mockReturnValueOnce({ promise: jest.fn().mockResolvedValue() })

  await sendBirthdayNotification()

  expect(mockPublish).toHaveBeenCalledWith(
    expect.objectContaining({ TopicArn: expect.any(String) })
  )

  expect(mockPublish).toHaveBeenCalledWith(
    expect.objectContaining({ TopicArn: process.env.TOPIC_ARN_BIRTHDAY })
  )
})

it('publishes a JSON string message containing `default` key', async () => {
  mockPublish.mockReturnValueOnce({ promise: jest.fn().mockResolvedValue() })

  await sendBirthdayNotification({ name: 'Foo', birthdate: '2017-01-02' })

  const message = mockPublish.mock.calls[0][0].Message
  const parsedMessage = JSON.parse(message)

  expect(parsedMessage).toEqual(
    expect.objectContaining({
      default: expect.any(String)
    })
  )
})

it('adds the received birthday into the message', async () => {
  mockPublish.mockReturnValueOnce({ promise: jest.fn().mockResolvedValue() })

  await sendBirthdayNotification({ name: 'Foo', birthdate: '2017-01-02' })

  const message = mockPublish.mock.calls[0][0].Message
  const parsedMessage = JSON.parse(message)
  const parsedData = JSON.parse(parsedMessage.default)

  expect(parsedData).toEqual({
    name: 'Foo',
    birthdate: '2017-01-02'
  })
})
