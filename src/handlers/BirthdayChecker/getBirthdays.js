'use strict'

const DynamoDB = require('aws-sdk/clients/dynamodb')

const client = new DynamoDB.DocumentClient({ apiVersion: '2012-08-10' })

function getCurrentDate() {
  const date = new Date()

  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const day = ('0' + date.getDate()).slice(-2)

  return `${month}-${day}`
}

function transformBirthdays({ BirthDate, Id, Name, BirthYear }) {
  return {
    birthDate: BirthDate,
    id: Id,
    name: Name,
    birthYear: BirthYear
  }
}

async function getBirthdays() {
  const res = await client
    .query({
      TableName: process.env.TABLE_NAME_BIRTHDAY,
      KeyConditionExpression: '#BirthDate = :date',
      ExpressionAttributeNames: {
        '#BirthDate': 'BirthDate'
      },
      ExpressionAttributeValues: {
        ':date': getCurrentDate()
      }
    })
    .promise()

  return res.Items.map(transformBirthdays)
}

module.exports = getBirthdays
