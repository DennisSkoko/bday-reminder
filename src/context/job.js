'use strict'

const { CronJob } = require('cron')

module.exports = ({ settings, logger, storage }) => fn =>
  new CronJob(Object.assign({}, settings.job, { onTick: fn }))
