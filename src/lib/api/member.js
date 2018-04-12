import _ from 'lodash';

import { fetch } from 'src/lib/api';


export function getMember(params) {
	return getMembers(params).then(result => _.first(result));
}

export function getMembers(params) {
	// console.log('getMembers', params);
	const defaultParams = {
		deleted_on: '_-NULL-_',
		archived_on: '_-NULL-_',
	};

	const queryParams = Object.assign({}, params, defaultParams);

    return fetch(`/member`, queryParams);
}
