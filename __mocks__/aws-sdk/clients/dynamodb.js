'use strict'

const mockQuery = jest.fn()
const mockPut = jest.fn()

function DocumentClient() {
  return {
    query: mockQuery,
    put: mockPut
  }
}

module.exports = { DocumentClient, mockQuery, mockPut }
