import "app-module-path/cwd";

import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import { ApolloEngine } from 'apollo-engine';
import cors from 'cors';

import {
	graphqlExpress,
	graphiqlExpress,
} from 'graphql-server-express';


import schema from 'src/schema';


const app = express();
const GRAPHQL_PORT = process.env.PORT || 4000;
const ENGINE_API_KEY = process.env.ENGINE_API_KEY || 'service:busyql-dev:TBn_8-iMm6A935TQ7pu0cQ';
const engine = new ApolloEngine({
  // apiKey: process.env.ENGINE_API_KEY,
  apiKey: ENGINE_API_KEY,
});

// No engine.start() or app.use() required!

// Instead of app.listen():
engine.listen({
  port: GRAPHQL_PORT,
  // graphqlPaths: ['/api/graphql'],
  expressApp: app,
  launcherOptions: {
    startupTimeout: 3000,
  },
}, () => {
  console.log('Listening!');
});

app.use(compression());
app.use('/graphql', bodyParser.json(), cors(), graphqlExpress({
	schema,
    tracing: true,
    cacheControl: true,
}));
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));
// app.listen(GRAPHQL_PORT, () => console.log('Now browse to localhost:4000/graphiql'));

/*

{
  organization {
    ...orgProps
    owner { ...memberProps }
  }
  memberById:member(id: "92cccae3-2aac-43c2-b69e-fbca7e472118") {
    ...memberProps

    organization {
      ...orgProps
    	owner {
        ...memberProps
      }
    }
  }
  # members:member {
  #   ...memberProps
  # }
}

fragment orgProps on OrganizationType {
    id
    organization_name
    owned_by
    updated_on
    created_on
    submitted_on
    deleted_on
}
fragment memberProps on MemberType {
    first_name
    last_name
    email
    organization_id
    position_id
}





 */
