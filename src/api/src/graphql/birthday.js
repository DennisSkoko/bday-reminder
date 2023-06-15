import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'
import {
  connectionDefinitions,
  connectionFromArraySlice,
  cursorToOffset,
  forwardConnectionArgs,
  fromGlobalId,
  globalIdField
} from 'graphql-relay'
import { Person } from '../database/person.js'
import { NodeInterface } from './node.js'

export const PersonType = new GraphQLObjectType({
  name: 'Person',
  interfaces: [NodeInterface],
  fields: {
    id: globalIdField('Person'),
    name: { type: new GraphQLNonNull(GraphQLString) },
    birthday: { type: new GraphQLNonNull(GraphQLString) }
  }
})

export const { connectionType: PersonConnectionType } = connectionDefinitions({
  nodeType: PersonType
})

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    people: {
      type: new GraphQLNonNull(PersonConnectionType),
      args: forwardConnectionArgs,
      resolve: async (_root, args) => {
        const offset = args.after && cursorToOffset(args.after) + 1
        const result = await Person.find({}, null, { skip: offset, limit: args.first })
        const totalCount = await Person.count()

        return connectionFromArraySlice(result, args, {
          sliceStart: offset || 0,
          arrayLength: totalCount
        })
      }
    }
  }
})

export const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    upsertPerson: {
      type: new GraphQLNonNull(PersonType),
      args: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        birthday: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_mutation, args) => {
        if (args.id) {
          const { type, id } = fromGlobalId(args.id)
          if (type != PersonType.name) return null

          const existingPerson = await Person.findById(id)

          if (existingPerson) {
            existingPerson.name = args.name
            existingPerson.birthday = args.birthday

            await existingPerson.save()

            return existingPerson
          }
        }

        return await Person.create({ name: args.name, birthday: args.birthday })
      }
    },

    deletePerson: {
      type: PersonType,
      args: {
        id: { type: GraphQLID }
      },
      resolve: async (_mutation, args) => {
        const { type, id } = fromGlobalId(args.id)
        if (type != PersonType.name) return null

        return await Person.findByIdAndDelete(id)
      }
    }
  }
})

export const Schema = new GraphQLSchema({ query: QueryType, mutation: MutationType })
