import { database } from './database.js'

export const Person = database.model(
  'Person',
  new database.Schema({
    name: {
      type: String,
      required: true
    },
    birthday: {
      type: String,
      required: true
    }
  })
)
