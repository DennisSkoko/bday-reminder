'use strict'

const loader = require('./util/context-loader')

const modules = [
  { name: 'settings', path: '../conf/app' },
  { path: 'context/logger' },
  { path: 'context/fs' },
  { path: 'context/markdown' },
  { path: 'context/storage' },
  { path: 'context/job' },
  { path: 'context/mail' },
  {
    path: 'commands',
    modules: [
      { path: 'add' },
      { path: 'remove' },
      { path: 'run' }
    ]
  },
  { path: 'context/app' }
]

module.exports = () => loader(modules).app()
