import _ from 'lodash';

import { fetch } from 'src/lib/api';


const operators = [ 'gt', 'gte', 'lt', 'lte' ];

export function getTimeEntry(params) {
	return getTimeEntries(params).then(result => _.first(result));
}

export function getTimeEntries(params) {
	// console.log('getTimeEntries', params);

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


export function getOpenTimeEntries(params) {
	// console.log('getOpenTimeEntries', params);

	return getTimeEntries({... params, end_time: null});
}
