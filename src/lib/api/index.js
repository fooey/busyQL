
import axios from 'axios';
import DataLoader from 'dataloader';
import LRU from 'lru-cache';
import url from 'url';
import _ from 'lodash';

export const CACHE_LONG = 1000 * 60 * 60;
export const CACHE_SHORT = 1000 * 5;

export const BASE_URL = `https://api-beta.busybusy.io`;

// export { getMember } from './member';


const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {'key-authorization': '9b629157152cba59fef7b5a608f25648af764a7865bff85235f578277a34ed7b'},
  params: {
	  _version: '3.2',
	  _debug: true,
	  deleted_on: '_-NULL-_',
  }
});

export function fetch(relativeURL, params = {}) {
	console.log('relativeURL', relativeURL);

    return instance.get(relativeURL, { params })
		.then(response => {
			console.log('requestURL', _.get(response, 'request._currentRequest.path', 'PATH NOT FOUND'));
			// console.log('data', response.data);

			return _.get(response, 'data.data');
		})
		.catch(err => {
			console.error(err);
			return [];
		});
}


export function getOrganization(params) {
    return fetch(`/organization`, params).then(result => _.first(result));
}

export function getMember(params) {
    return fetch(`/member`, params).then(result => _.first(result));
}




// export function fetchWorlds(slug = '') {
// 	// console.log('fetchWorlds', slug);
//     return fetch(`/v2/worlds${slug}`);
// }
//
// export function getWorld(id) {
// 	// console.log('getWorld', id);
//     return getWorlds([...id]);
// }
//
// export function getWorlds(ids=['all']) {
// 	// console.log('getWorlds', ids);
//     return fetchWorlds(`?ids=${ids.join(',')}`);
// }
//
//
//
// export function fetchMatches(slug = '') {
//     return fetch(`/v2/wvw/matches${slug}`);
// }
//
// export function getMatch(id) {
//     return fetchMatches(`/${id}`);
// }
//
// export function getMatches(ids=['all']) {
//     return fetchMatches(`?ids=${ids}`);
// }
