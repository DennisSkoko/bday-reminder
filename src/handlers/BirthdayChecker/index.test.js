'use strict'

const index = require('./index')

it('exports a handler function', () => {
  expect(index.handler).toBeInstanceOf(Function)
})
