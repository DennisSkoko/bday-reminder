'use strict'

const path = require('path')

const root = path.resolve(__dirname, '..')

require('dotenv').config({
  path: path.join(root, '.env')
})

module.exports = () => ({
  version: '1.0.0',

  storage: {
    path: path.join(root, 'res', 'storage.json'),
    encoding: 'utf8'
  },

  logger: {
    level: process.env.LOG_LEVEL || 'info',
    timestamp: true,
    colors: true
  },

  job: {
    cronTime: '0 0 12 * * *',
    start: true
  },

  mailer: {
    template: path.join(root, 'res', 'mail.md'),
    service: process.env.EMAIL_PROVIDER || 'Hotmail',
    auth: {
      user: process.env.EMAIL_USER || 'something@example.com',
      pass: process.env.EMAIL_PASS || 'secret'
    },
    to: {
      email: process.env.EMAIL_SENDTO || 'receiver@example.com'
    }
  }
})
