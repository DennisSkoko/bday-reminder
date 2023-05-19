import { mergeSchemas } from '@graphql-tools/schema'
import { schema as birthday } from './birthday.js'

export const schema = mergeSchemas({
  schemas: [birthday]
})
