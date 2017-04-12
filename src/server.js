import "app-module-path/cwd";

import express from 'express';
import bodyParser from 'body-parser';

import {
	graphqlExpress,
	graphiqlExpress,
} from 'graphql-server-express';


import schema from 'src/schema';

const app = express();
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphiql'));

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
