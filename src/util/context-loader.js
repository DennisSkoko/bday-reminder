'use strict'

const path = require('path')
const getCallerFile = require('get-caller-file')

module.exports = modules => {
  const root = path.dirname(getCallerFile())
  const result = {}

  const fetch = (root, assign, modules) => {
    modules.forEach(module => {
      const name = module.name || path.basename(module.path, '.js')

      if (module.modules) {
        result[name] = {}

        fetch(
          module.path ? path.join(root, module.path) : root,
          result[name],
          module.modules
        )
      } else {
        assign[name] = require(path.join(root, module.path))(result)
      }
    })
  }

  fetch(root, result, modules)
  return result
}
