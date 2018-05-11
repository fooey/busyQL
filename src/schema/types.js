import _ from 'lodash';

const modules = require('require-all')(__dirname + '/types');
const types = _.map(modules, 'default');


const typeDefs = _.map(types, 'typeDefs');
const queries = _.map(types, 'queries').join('\n');
const resolvers = _.reduce(
	types,
	(acc, model) => _.merge(acc, model.resolvers)
	, {}
);





export default {
	typeDefs,
	queries,
	resolvers,
};
