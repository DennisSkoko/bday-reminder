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

  reminder: {
    cronTime: '* * * * * *', // '0 0 9 * * *',
    start: true
  }
})
