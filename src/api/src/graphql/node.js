import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import { fromGlobalId, nodeDefinitions } from 'graphql-relay'
import { Person } from '../database/person.js'
import { PersonType } from './birthday.js'

const { nodeInterface, nodeField } = nodeDefinitions(
  async globalId => {
    const { type, id } = fromGlobalId(globalId)

    switch (type) {
      case PersonType.name:
        return Person.findById(id)
      default:
        return null
    }
  },

  /**
   * @param {unknown} obj
   * @returns {string | undefined}
   */
  obj => {
    if (typeof obj !== 'object' || obj === null) return undefined

    switch (obj?.constructor) {
      case Person:
        return PersonType.name
      default:
        return undefined
    }
  }
)

export { nodeInterface as NodeInterface }

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({ node: nodeField })
})

export const Schema = new GraphQLSchema({ query: QueryType })
