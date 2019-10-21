'use strict'

const DynamoDB = require('aws-sdk/clients/dynamodb')

const client = new DynamoDB.DocumentClient({ apiVersion: '2011-12-05' })

function getCurrentDate() {
  const currentDate = new Date()

  const year = currentDate.getFullYear()
  const month = ('0' + (currentDate.getMonth() + 1)).slice(-2)
  const date = ('0' + currentDate.getDate()).slice(-2)

  return `${year}-${month}-${date}`
}

async function getBirthdays() {
  const res = await client
    .scan({ TableName: process.env.TABLE_NAME_BIRTHDAY })
    .promise()

  return res.Items.filter(item => item.Birthdate === getCurrentDate())
}

module.exports = getBirthdays
