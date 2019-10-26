'use strict'

const uuid = require('uuid/v4')
const DynamoDB = require('aws-sdk/clients/dynamodb')

const client = new DynamoDB.DocumentClient({ apiVersion: '2012-08-10' })

function putBirthday({ name, birthDate, birthYear }) {
  return client
    .put({
      TableName: process.env.TABLE_NAME_BIRTHDAY,
      Item: {
        Id: uuid(),
        Name: name,
        BirthDate: birthDate,
        BirthYear: birthYear
      }
    })
    .promise()
}

module.exports = putBirthday
