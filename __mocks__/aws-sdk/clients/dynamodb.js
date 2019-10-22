'use strict'

const mockQuery = jest.fn()

function DocumentClient() {
  return {
    query: mockQuery
  }
}

module.exports = { DocumentClient, mockQuery }
