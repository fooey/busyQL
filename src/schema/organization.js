
import _ from 'lodash';

import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull
} from 'graphql/type';

import {
	getOrganization,
	getOrganizations,
	getMember,
	getMembers,
} from 'src/lib/api';

import { MemberType } from './index';


export const OrganizationType = new GraphQLObjectType({
    name: 'OrganizationType',
    fields: () => ({
        id: { type: GraphQLID },
        organization_name: { type: GraphQLString },
        owned_by: { type: GraphQLID },
        updated_on: { type: GraphQLInt },
        created_on: { type: GraphQLInt },
        submitted_on: { type: GraphQLInt },
        deleted_on: { type: GraphQLInt },

		owner: {
			type: MemberType,
			resolve: ({ owned_by }) => getMember({ id: owned_by }),
		},
    })
});

export const OrganizationQuery = {
    type: OrganizationType,
    args: {
        id: { type: GraphQLID },
    },
    resolve: (parent, params) => getOrganization(params),
};

export const OrganizationsQuery = {
    type: new GraphQLList(OrganizationType),
    args: {
        id: { type: GraphQLID },
    },
    resolve: (parent, params) => getOrganizations(params),
};
