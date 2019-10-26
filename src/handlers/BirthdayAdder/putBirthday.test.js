'use strict'

const uuid = require('uuid/v4')
const DynamoDB = require('aws-sdk/clients/dynamodb')
const putBirthday = require('./putBirthday')

jest.mock('uuid/v4')
jest.mock('aws-sdk/clients/dynamodb')

const { mockPut } = DynamoDB

it('generates a unique id', async () => {
  uuid.mockReturnValueOnce('mock uuid')
  mockPut.mockReturnValueOnce({ promise: jest.fn().mockResolvedValue() })

  await putBirthday({})

  expect(uuid).toHaveBeenCalled()
  expect(mockPut).toHaveBeenCalledWith(
    expect.objectContaining({
      Item: { Id: 'mock uuid' }
    })
  )
})

it('adds the given arguments in the database', async () => {
  mockPut.mockReturnValueOnce({ promise: jest.fn().mockResolvedValue() })

  await putBirthday({
    name: 'mock name',
    birthDate: '01-15',
    birthYear: '1990'
  })

  expect(mockPut).toHaveBeenCalledWith(
    expect.objectContaining({
      Item: {
        Name: 'mock name',
        BirthDate: '01-15',
        BirthYear: '1990'
      }
    })
  )
})

it('writes to the TABLE_NAME_BIRTHDAY table', async () => {
  mockPut.mockReturnValueOnce({ promise: jest.fn().mockResolvedValue() })

  await putBirthday({})

  expect(mockPut).toHaveBeenCalledWith(
    expect.objectContaining({ TableName: expect.any(String) })
  )

  expect(mockPut).toHaveBeenCalledWith(
    expect.objectContaining({ TableName: process.env.TABLE_NAME_BIRTHDAY })
  )
})
