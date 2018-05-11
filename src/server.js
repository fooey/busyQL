import "app-module-path/cwd";

import { ApolloEngine } from 'apollo-engine';
import { printSchema } from 'graphql/utilities/schemaPrinter';

import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';



import schema from './schema';


const app = express();
const GRAPHQL_PORT = process.env.PORT || 4000;
const ENGINE_API_KEY = process.env.ENGINE_API_KEY || 'service:busyql-dev:TBn_8-iMm6A935TQ7pu0cQ';
const engine = new ApolloEngine({
  // apiKey: process.env.ENGINE_API_KEY,
  apiKey: ENGINE_API_KEY,
});


engine.listen({
  port: GRAPHQL_PORT,
  // graphqlPaths: ['/api/graphql'],
  expressApp: app,
  launcherOptions: {
    startupTimeout: 3000,
  },
}, () => {
  console.log('GraphQL', 'Listening!');
});


app.use(compression());

app.use('/graphql', bodyParser.json(), cors(), graphqlExpress({
	schema,
    tracing: true,
    cacheControl: true,
    context: {},
}));
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));
app.use('/schema', (req, res) => res.type('text/plain').send(printSchema(schema)));
