import { mergeSchemas } from '@graphql-tools/schema'
import { Schema as birthday } from './birthday.js'
import { Schema as node } from './node.js'

export const schema = mergeSchemas({
  schemas: [node, birthday]
})
