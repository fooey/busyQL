// import _ from 'lodash';

import {
	// GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	// GraphQLFloat,
	GraphQLList,
	GraphQLID,
	GraphQLBoolean,
	// GraphQLNonNull
} from 'graphql/type';

import {getMember, getProject, getTimeEntry, getTimeEntries, getOpenTimeEntries} from 'src/lib/api';

import {MemberType, ProjectType} from './index';

export const TimeEntryType = new GraphQLObjectType({
	name: 'TimeEntryType',
	fields: () => ({
		id: { type: GraphQLID },
		member_id: { type: GraphQLID },
		project_id: { type: GraphQLID },
		start_location_id: { type: GraphQLString },
		start_device_time: { type: GraphQLInt },
		end_location_id: { type: GraphQLString },
		cost_code_id: { type: GraphQLID },
		equipment_id: { type: GraphQLID },
		action_type: { type: GraphQLInt },
		start_time: { type: GraphQLInt },
		start_time_trusted: { type: GraphQLInt },
		end_time: { type: GraphQLInt },
		end_device_time: { type: GraphQLInt },
		end_time_trusted: { type: GraphQLInt },
		offset: { type: GraphQLInt },
		meta_offset: { type: GraphQLInt },
		daylight_saving_time: { type: GraphQLBoolean },
		meta_daylight_saving_time: { type: GraphQLBoolean },
		updated_on: { type: GraphQLInt },
		created_on: { type: GraphQLInt },
		submitted_on: { type: GraphQLInt },
		deleted_on: { type: GraphQLInt },

		member: {
			type: MemberType,
			resolve: ({member_id}) => getMember({id: member_id})
		},

		project: {
			type: ProjectType,
			resolve: ({project_id}) => getProject({id: project_id})
		},

		// cost_code: {
		// 	type: CostCodeType,
		// 	resolve: ({ cost_code_id }) => getCostCode({ id: cost_code_id }),
		// },
		// equipment: {
		// 	type: EquipmentType,
		// 	resolve: ({ equipment_id }) => getEquipment({ id: equipment_id }),
		// },
	})
});

export const TimeEntryArgs = {
	id: {
		type: GraphQLID
	},
	member_id: {
		type: GraphQLID
	},
	start_time: {
		type: GraphQLInt
	},
	start_time_gt: {
		type: GraphQLInt
	},
	start_time_gte: {
		type: GraphQLInt
	},
	start_time_lt: {
		type: GraphQLInt
	},
	start_time_lte: {
		type: GraphQLInt
	},
	end_time: {
		type: GraphQLInt
	},
	end_time_gt: {
		type: GraphQLInt
	},
	end_time_gte: {
		type: GraphQLInt
	},
	end_time_lt: {
		type: GraphQLInt
	},
	end_time_lte: {
		type: GraphQLInt
	}
};

export const TimeEntryQuery = {
	type: TimeEntryType,
	args: TimeEntryArgs,
	resolve: (parent, params) => getTimeEntry(params)
};

export const TimeEntriesQuery = {
	type: new GraphQLList(TimeEntryType),
	args: TimeEntryArgs,
	resolve: (parent, params) => getTimeEntries(params)
};

export const OpenTimeEntriesQuery = {
	type: new GraphQLList(TimeEntryType),
	args: TimeEntryArgs,
	resolve: (parent, params) => getOpenTimeEntries(params)
};
