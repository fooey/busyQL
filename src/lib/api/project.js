import _ from 'lodash';

import { fetch } from 'src/lib/api';


export function getProject(params) {
    return getProjects(params).then(result => _.first(result));
}

export function getProjects(params) {
    return fetch(`/project`, params);
}
