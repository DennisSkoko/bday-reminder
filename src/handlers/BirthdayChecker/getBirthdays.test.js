'use strict'

const DynamoDB = require('aws-sdk/clients/dynamodb')
const getBirthdays = require('./getBirthdays')

jest.mock('aws-sdk/clients/dynamodb')

const { mockQuery } = DynamoDB

beforeAll(() => {
  jest.spyOn(Date.prototype, 'getMonth')
  jest.spyOn(Date.prototype, 'getDate')
})

afterAll(() => {
  jest.restoreAllMocks()
})

it('reads from the TABLE_NAME_BIRTHDAY table', async () => {
  mockQuery.mockReturnValueOnce({
    promise: jest.fn().mockResolvedValue({ Items: [] })
  })

  await getBirthdays()

  expect(mockQuery).toHaveBeenCalledWith(
    expect.objectContaining({ TableName: expect.any(String) })
  )

  expect(mockQuery).toHaveBeenCalledWith(
    expect.objectContaining({ TableName: process.env.TABLE_NAME_BIRTHDAY })
  )
})

it('queries only for the current date', async () => {
  Date.prototype.getDate.mockReturnValueOnce(15)
  Date.prototype.getMonth.mockReturnValueOnce(0)

  mockQuery.mockReturnValueOnce({
    promise: jest.fn().mockResolvedValue({ Items: [] })
  })

  await getBirthdays()

  expect(mockQuery).toHaveBeenCalledWith(
    expect.objectContaining({
      ExpressionAttributeValues: { ':date': '01-15' }
    })
  )
})

it('transforms the property keys to camel case', async () => {
  mockQuery.mockReturnValueOnce({
    promise: jest.fn().mockResolvedValue({
      Items: [{ BirthDate: '06-30', Id: 'Foo', Name: 'Bar', BirthYear: '1990' }]
    })
  })

  const res = await getBirthdays()

  expect(res).toEqual([
    {
      birthDate: '06-30',
      id: 'Foo',
      name: 'Bar',
      birthYear: '1990'
    }
  ])
})
