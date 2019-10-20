'use strict'

const mockPublish = jest.fn()

function SNS() {
  return {
    publish: mockPublish
  }
}

module.exports = SNS
module.exports.mockPublish = mockPublish
