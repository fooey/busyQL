import _ from 'lodash';

import { fetch } from 'src/lib/api';

import { getOrganization } from './organization';
import { query as getTimeEntries, getOpenTimeEntries } from './time-entry';




export function query(customParams, context) {
	const defaultParams = {
		deleted_on: '_-NULL-_',
		archived_on: '_-NULL-_',
	};

	const params = Object.assign({}, customParams, defaultParams);

	return fetch(`/member`, params, context);
}

export function getMember(id, context) {
	return query({ id }, context).then(result => _.first(result));
}




const typeDefs = `
	type Member {
		id: ID
		member_group_id: ID
		organization_id: ID
		position_id: ID

		first_name: String
		last_name: String
		email: String
		username: String
		username_unique: String

		last_access: Int
		archived_on: Int
		updated_on: Int
		created_on: Int
		submitted_on: Int
		deleted_on: Int

		organization: Organization
		timeEntries: [TimeEntry]
		openTimeEntries: [TimeEntry]
	}
`;

const queries = `
	member(id: ID): Member
	members(id: ID): [Member]
`;


const resolvers = {
	Query: {
		member: (root, { id }, context) => getMember(id, context),
		members: (root, params, context) => query(params, context),
	},
	Member: {
		organization: (parent, props, context) =>  getOrganization(parent.organization_id, context),
		timeEntries: (parent, props, context) =>  getTimeEntries({ member_id: parent.id }, context),
		openTimeEntries: (parent, props, context) =>  getOpenTimeEntries({ member_id: parent.id }, context),
	},
};



export default {
	typeDefs,
	queries,
	resolvers,
}
