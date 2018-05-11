
import Promise from 'bluebird';
import DataLoader from 'dataloader';
import LRU from 'lru-cache';
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


export { MemberType } from 'src/schema/member';
export { OrganizationType } from 'src/schema/organization';
export { ProjectType } from 'src/schema/project';
export { TimeEntryType } from 'src/schema/time-entry';


import { MemberQuery, MembersQuery } from 'src/schema/member';
import { OrganizationQuery, OrganizationsQuery } from 'src/schema/organization';
import { ProjectQuery, ProjectsQuery } from 'src/schema/project';
import { TimeEntryQuery, TimeEntriesQuery, OpenTimeEntriesQuery } from 'src/schema/time-entry';




const RootType = new GraphQLObjectType({
  name: 'RootType',
  fields: {
    organization: OrganizationQuery,
    organizations: OrganizationsQuery,

    member: MemberQuery,
    members: MembersQuery,

    project: ProjectQuery,
    projects: ProjectsQuery,

    timeEntry: TimeEntryQuery,
    timeEntries: TimeEntriesQuery,
    openTimeEntries: OpenTimeEntriesQuery,
    //
    // match: MatchQuery,
    // matches: MatchesQuery,
    //
    // objective: ObjectiveQuery,
    // objectives: ObjectivesQuery,
  }
});


const schema = new GraphQLSchema({ query: RootType });
export default schema;
