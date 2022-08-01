import typeDefs from '@/main/graphql/type-defs'
import resolvers from '@/main/graphql/resolvers'

import { ApolloServer } from 'apollo-server-express'

export default (): ApolloServer => {
  return new ApolloServer({
    resolvers,
    typeDefs
  })
}
