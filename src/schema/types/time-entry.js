import _ from 'lodash';

import { fetch } from 'src/lib/api';

import { getMember } from './member';
import { getProject } from './project';



const operators = [ 'gt', 'gte', 'lt', 'lte' ];

export function query(params) {
	// console.log('query', params);

	const paramsRemapped = Object.keys(params).reduce((acc, key) => {
		const operator = _.last(key.split('_'));
		const mappedVal = params[key] === null ? '_-NULL-_' : params[key];

		let param = { [key]: mappedVal };

		if (operators.includes(operator)) {
			const newKey = _.dropRight(key.split('_')).join('_');

			param = { [`_${operator}[${newKey}]`]: mappedVal };
		}

		return Object.assign({}, acc, param);
	}, {});

	const defaultParams = {
		deleted_on: '_-NULL-_',
	};

	const queryParams = Object.assign({}, paramsRemapped, defaultParams);

    return fetch(`/time-entry`, queryParams);
}


export function getTimeEntry(params) {
	return query(params).then(result => _.first(result));
}


export function getOpenTimeEntries(params) {
	return query({... params, end_time: null});
}


const typeDefs = `
	type TimeEntry {
		id: ID
		member_id: ID
		project_id: ID
		start_location_id: String
		start_device_time: Int
		end_location_id: String
		cost_code_id: ID
		equipment_id: ID
		action_type: Int
		start_time: Int
		start_time_trusted: Int
		end_time: Int
		end_device_time: Int
		end_time_trusted: Int
		offset: Int
		meta_offset: Int
		daylight_saving_time: Boolean
		meta_daylight_saving_time: Boolean
		updated_on: Int
		created_on: Int
		submitted_on: Int
		deleted_on: Int

		member: Member
		project: Project
	}
`;

export const params = `
	id: ID
	member_id: ID
	start_time: Int
	start_time_gt: Int
	start_time_gte: Int
	start_time_lt: Int
	start_time_lte: Int
	end_time: Int
	end_time_gt: Int
	end_time_gte: Int
	end_time_lt: Int
	end_time_lte: Int
`;

const queries = `
	timeEntry(${params}): TimeEntry
	timeEntries(${params}): [TimeEntry]
	openTimeEntries(${params}): [TimeEntry]
`;


const resolvers = {
	Query: {
		timeEntry: (root, { id }) => getTimeEntry(id),
		timeEntries: (root, params) => query(params),
		openTimeEntries: (root, params) => getOpenTimeEntries(params),
	},
	TimeEntry: {
		member: (TimeEntry) =>  getMember(TimeEntry.member_id),
		project: (TimeEntry) =>  getProject(TimeEntry.project_id),
	},
};



export default {
	typeDefs,
	queries,
	resolvers,
}
