'use strict'

const loader = require('./util/context-loader')

const modules = [
  { name: 'settings', path: '../conf/app' },
  { path: 'context/logger' },
  { path: 'context/storage' },
  { path: 'context/job' },
  {
    path: 'commands',
    modules: [
      { path: 'add' },
      { path: 'run' }
    ]
  },
  { path: 'context/app' }
]

module.exports = () => loader(modules).app()
