
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
	getMember,
	getOrganization
} from 'src/lib/api';

import { OrganizationType } from './index';

console.log('OrganizationType', OrganizationType);


export const MemberType = new GraphQLObjectType({
    name: 'MemberType',
    fields: () => ({
        id: { type: GraphQLString },
		member_group_id: { type: GraphQLString },
        organization_id: { type: GraphQLString },
        position_id: { type: GraphQLString },

        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        email: { type: GraphQLString },
        username: { type: GraphQLString },
        username_unique: { type: GraphQLString },

        last_access: { type: GraphQLInt },
        archived_on: { type: GraphQLInt },
        updated_on: { type: GraphQLInt },
        created_on: { type: GraphQLInt },
        submitted_on: { type: GraphQLInt },
        deleted_on: { type: GraphQLInt },

		organization: {
			type: OrganizationType,
			resolve: ({ organization_id }) => getOrganization({ id: organization_id }),
		},
    })
});

export const MemberQuery = {
    type: MemberType,
    args: {
        id: { type: GraphQLString },
    },
    resolve: (parent, params) => getMember(params),
};

export default () => [MemberType, MemberQuery];
