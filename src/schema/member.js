
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
	getMembers
} from 'src/lib/api/member';

import { getOrganization } from 'src/lib/api/organization';
import { getTimeEntries, getOpenTimeEntries } from 'src/lib/api/time-entry';

import { OrganizationType } from 'src/schema/organization';
import { TimeEntryType, TimeEntryArgs } from 'src/schema/time-entry';


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

		timeEntries: {
		    type: new GraphQLList(TimeEntryType),
		    args: TimeEntryArgs,
			resolve: ({ id }, args) => {
				console.log('args', args);
				return getTimeEntries({ member_id: id, ...args });
			},
		},

		openTimeEntries: {
		    type: new GraphQLList(TimeEntryType),
			resolve: ({ id }) => getOpenTimeEntries({ member_id: id }),
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
