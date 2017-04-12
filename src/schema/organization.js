
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
	getMember,
} from 'src/lib/api';

import { MemberType } from './index';


export const OrganizationType = new GraphQLObjectType({
    name: 'OrganizationType',
    fields: () => ({
        id: { type: GraphQLString },
        organization_name: { type: GraphQLString },
        owned_by: { type: GraphQLString },
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
        id: { type: GraphQLString },
    },
    resolve: (parent, params) => getOrganization(params),
};
