import _ from 'lodash';

import { fetch } from 'src/lib/api';


export function getOrganization(params) {
    return getOrganizations(params).then(result => _.first(result));
}

export function getOrganizations(params) {
    return fetch(`/organization`, params);
}
