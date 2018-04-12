
import _ from 'lodash';

import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull,
	GraphQLBoolean
} from 'graphql/type';

import {
	getOrganization,
	getProject,
	getProjects,
} from 'src/lib/api';

import { OrganizationType } from './index';


export const ProjectType = new GraphQLObjectType({
    name: 'ProjectType',
    fields: () => ({
        id: { type: GraphQLID },
        organization_id: { type: GraphQLID },
        parent_project_id: { type: GraphQLID },
        title: { type: GraphQLString },
        depth: { type: GraphQLInt },
        image_id: { type: GraphQLID },
        root_project_id: { type: GraphQLID },
        task_loggable: { type: GraphQLBoolean },
        time_loggable: { type: GraphQLBoolean },
        all_access: { type: GraphQLBoolean },
        archived_on: { type: GraphQLInt },
        project_group_id: { type: GraphQLID },
        updated_on: { type: GraphQLInt },
        created_on: { type: GraphQLInt },
        submitted_on: { type: GraphQLInt },
        deleted_on: { type: GraphQLInt },

		organization: {
			type: OrganizationType,
			resolve: ({ organization_id }) => getOrganization({ id: organization_id }),
		},

		parent_project: {
			type: ProjectType,
			resolve: ({ parent_project_id }) => parent_project_id === null ? null : getProject({ id: parent_project_id }),
		},

		root_project: {
			type: ProjectType,
			resolve: ({ root_project_id }) => getProject({ id: root_project_id }),
		},

		child_projects: {
			type: new GraphQLList(ProjectType),
			resolve: ({ id }) => getProjects({ parent_project_id: id }),
		},
    })
});

export const ProjectQuery = {
    type: ProjectType,
    args: {
        id: { type: GraphQLID },
        archived_on: { type: GraphQLInt },
    },
    resolve: (parent, params) => getProject(params),
};

export const ProjectsQuery = {
    type: new GraphQLList(ProjectType),
    args: {
        id: { type: GraphQLID },
        organization_id: { type: GraphQLID },
        parent_project_id: { type: GraphQLID },
        root_project_id: { type: GraphQLID },
        archived_on: { type: GraphQLInt },
    },
    resolve: (parent, params) => getProjects(params),
};
