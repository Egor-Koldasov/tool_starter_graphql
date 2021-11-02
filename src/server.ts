import { ApolloServer, ExpressContext } from 'apollo-server-express';
import { getResolvers } from './schema/resolvers';
import typeDefs from './schema/schema';
import express from 'express';
import cookieParser from 'cookie-parser';
import { authMiddleware } from './tokenAuth';
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import config from './config';

interface ListenParams {port: number};

const startServer = async ({port = 4000} = {}) => {
  const server = new ApolloServer({
    context: (expressContext: ExpressContext) => expressContext,
    typeDefs,
    resolvers: getResolvers(),
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
  });
  await server.start();
  const app = express();
  app.use(cookieParser(config.cookiesSecret));
  app.use(authMiddleware());
  // for cookies to work in apollo explorer
  server.applyMiddleware({
    app,
    cors: {
      origin: ['https://studio.apollographql.com'],
      credentials: true,
    },
  });
  const listen = async (params: ListenParams) => new Promise<void>((resolve) => app.listen(params, resolve));
  await listen({port});
  console.log(`Graphql server started: localhost:${port}/graphql`);
}

startServer({port: config.graphqlPort});