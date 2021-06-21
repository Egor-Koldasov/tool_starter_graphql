import { ApolloServer } from 'apollo-server';
import { getResolvers } from './resolvers';
import typeDefs from './schema';


const server = new ApolloServer({ typeDefs, resolvers: getResolvers() });

const port = 4000;
server.listen({host: '0.0.0.0', port}).then(() => {
  console.log(`
    Server is running!
    Listening on port ${port}
    Explore at https://studio.apollographql.com/dev
  `);
});