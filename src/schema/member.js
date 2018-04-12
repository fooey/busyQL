
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
	getMembers,
	getOrganization
} from 'src/lib/api';

import { OrganizationType } from './index';

console.log('OrganizationType', OrganizationType);


export const MemberType = new GraphQLObjectType({
    name: 'MemberType',
    fields: () => ({
        id: { type: GraphQLID },
		member_group_id: { type: GraphQLID },
        organization_id: { type: GraphQLID },
        position_id: { type: GraphQLID },

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
        id: { type: GraphQLID },
    },
    resolve: (parent, params) => getMember(params),
};

export const MembersQuery = {
    type: new GraphQLList(MemberType),
    args: {
        id: { type: GraphQLID },
    },
    resolve: (parent, params) => getMembers(params),
};

export default () => [MemberType, MemberQuery];
