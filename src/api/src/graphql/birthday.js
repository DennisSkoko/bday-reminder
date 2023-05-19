import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema } from 'graphql'

export const birthday = new GraphQLObjectType({
    name: 'Birthday',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) }
    }
})

export const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            birthdays: {
                type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(birthday))),
                resolve: () => {
                    return []
                }
            }
        }
    })
})
