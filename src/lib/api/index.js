import _ from 'lodash';
import axios from 'axios';
import Bottleneck from 'bottleneck';

export const BASE_URL = `https://api-beta.busybusy.io`;

const limiter = new Bottleneck({
	maxConcurrent: 32,
	minTime: 0
});

const instance = axios.create({
	baseURL: BASE_URL,
	timeout: 10000,
	headers: {
		'key-authorization': '1b16ce8d8600e3d361c8b91513760bcdaca402afec7a68f01308b392fcf18936'
	},
	params: {
		_version: '3.2',
		_debug: true,
		deleted_on: '_-NULL-_'
	}
});

export function fetch(relativeURL, params = {}) {
	console.log('relativeURL', relativeURL, {params});

	return limiter.schedule(() => instance.get(relativeURL, {params})).then(response => {
		console.log('requestURL', _.get(response, 'request.path', 'NO PATH INFO'));
		// console.log('data', response.data);
		// console.log('request', response.request);

		return _.get(response, 'data.data');
	}).catch(err => {
		console.error(err);
		return [];
	});
}
