import _ from 'lodash';

import { fetch } from 'src/lib/api';

import { getOrganization } from './organization';
import { query as getTimeEntries, getOpenTimeEntries } from './time-entry';




export function query(params) {
	const defaultParams = {
		deleted_on: '_-NULL-_',
		archived_on: '_-NULL-_',
	};

	const queryParams = Object.assign({}, params, defaultParams);

	return fetch(`/member`, queryParams);
}

export function getMember(id) {
	return query({ id }).then(result => _.first(result));
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
		member: (root, { id }) => getMember(id),
		members: (root, params) => query(params),
	},
	Member: {
		organization: (Member) =>  getOrganization(Member.organization_id),
		timeEntries: (Member) =>  getTimeEntries({ member_id: Member.id }),
		openTimeEntries: (Member) =>  getOpenTimeEntries({ member_id: Member.id }),
	},
};



export default {
	typeDefs,
	queries,
	resolvers,
}
