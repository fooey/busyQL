import _ from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';

import types from './types';


const queryDef = `
	type Query { ${types.queries} }
`;


const typeDefs = [
	queryDef,
	...types.typeDefs,
];


const resolvers = _.merge(
	types.resolvers,
);




export default makeExecutableSchema({
	typeDefs,
	resolvers,
});
