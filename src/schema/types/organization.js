import _ from 'lodash';

import { fetch } from 'src/lib/api';

import { getMember, getMembers } from './member';


export function query(params) {
    return fetch(`/organization`, params);
}

export function getOrganization(id) {
    return query({ id }).then(result => _.first(result));
}


const typeDefs = `
	type Organization {
		id: ID
		organization_name: String
		owned_by: ID
		updated_on: Int
		created_on: Int
		submitted_on: Int
		deleted_on: Int

		owner: Member
		members: [Member]
	}
`;

const queries = `
	organization(id: ID): Organization
	organizations(id: ID): [Organization]
`;


const resolvers = {
	Query: {
		organization: (root, { id }) => getOrganization(id),
		organizations: (root, params) => query(params),
	},
	Organization: {
		owner: (Organization) =>  getMember(Organization.owned_by),
		members: (Organization) =>  getMembers({ organization_id: Organization.id })
	},
};



export default {
	typeDefs,
	queries,
	resolvers,
}
