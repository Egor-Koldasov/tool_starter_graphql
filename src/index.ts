import { ApolloServer } from 'apollo-server';
import { db } from './database/db-connection';
import typeDefs from './schema';


const server = new ApolloServer({ typeDefs });

db('user').then(console.log);

server.listen().then(() => {
  console.log(`
    Server is running!
    Listening on port 4000
    Explore at https://studio.apollographql.com/dev
  `);
});