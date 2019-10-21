'use strict'

const SNS = require('aws-sdk/clients/sns')

const sns = new SNS({ apiVersion: '2010-03-31' })

function sendBirthdayNotification(birthday) {
  return sns
    .publish({
      TopicArn: process.env.TOPIC_ARN_BIRTHDAY,
      MessageStructure: 'json',
      Message: JSON.stringify({ default: JSON.stringify(birthday) })
    })
    .promise()
}

module.exports = sendBirthdayNotification
