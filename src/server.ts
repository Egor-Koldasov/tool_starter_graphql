import './database/env/load-dev';
import { ApolloServer, ExpressContext } from 'apollo-server-express';
import type {Server} from 'http';
import { getResolvers } from './schema/resolvers';
import { getSchema } from './schema/schema';
import express from 'express';
import cookieParser from 'cookie-parser';
import { authMiddleware } from './tokenAuth';
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import config from './config';

interface ListenParams {port: number};

export const startServer = async () => {
  const port = config.graphqlPort;
  const schema = await getSchema();
  const apolloServer = new ApolloServer({
    context: (expressContext: ExpressContext) => expressContext,
    typeDefs: schema,
    resolvers: getResolvers(),
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
  });
  await apolloServer.start();
  const app = express();
  app.use(cookieParser(config.cookiesSecret));
  app.use(authMiddleware());
  // for cookies to work in apollo explorer
  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: [
        ...config.corsOrigins,
      ],
      credentials: true,
    },
  });
  const listen = async (params: ListenParams) => new Promise<Server> ((resolve) => {
    const server: Server = app.listen(params, () => resolve(server));
  });
  const server = await listen({port});
  console.log(`Graphql server started: localhost:${port}/graphql (${process.env.DB_NAME})`);
  server.on('close', () => console.log('Graphql server closing'));
  server.on('error', (error: any) => console.log('Graphql server error', error));
  return server;
}
