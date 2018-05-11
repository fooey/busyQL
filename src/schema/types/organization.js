import _ from 'lodash';

import { fetch } from 'src/lib/api';

import { getMember, getMembers } from './member';


export function query(params, context) {
    return fetch(`/organization`, params, context);
}

export function getOrganization(id, context) {
    return query({ id }, context).then(result => _.first(result));
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
		organization: (root, { id }, context) => getOrganization(id, context),
		organizations: (root, params, context) => query(params, context),
	},
	Organization: {
		owner: (parent, props, context) =>  getMember(parent.owned_by, context),
		members: (parent, props, context) =>  getMembers({ organization_id: parent.id }, context)
	},
};



export default {
	typeDefs,
	queries,
	resolvers,
}
