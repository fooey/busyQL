
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


/*

{
  organization {
    ...orgProps
  }
  member(id: "e97764da-3ae4-47e2-b897-4b460a5c7bc4") {
    id
    first_name
    last_name
    organization_id
    organization {
      ...orgProps
    }
  }
  # members {
  #   id
  #   first_name
  #   last_name
  #   organization_id
  #   organization {
  #     ...slimOrg
  #   }
  # }
}

fragment orgProps on OrganizationType {
  organization_name
  owned_by
  owner {
    first_name
    last_name
  }
}


 */




// const ObjectiveType = new GraphQLObjectType({
//     name: 'ObjectiveType',
//     fields: {
//         id: { type: GraphQLString },
//         name: { type: GraphQLString },
//         sector_id: { type: GraphQLInt },
//         type: { type: GraphQLString },
//         map_type: { type: GraphQLString },
//         map_id: { type: GraphQLInt },
//         coord: { type: new GraphQLList(GraphQLFloat) },
//         label_coord: { type: new GraphQLList(GraphQLFloat) },
//         marker: { type: GraphQLString },
//         chat_link: { type: GraphQLString },
//     }
// });
//
//
// const MatchWorldsType = new GraphQLObjectType({
//     name: 'MatchWorldsType',
//     fields: {
//         red: { type: WorldType },
//         green: { type: WorldType },
//         blue: { type: WorldType },
// }
// });
//
// const MatchScoresType = new GraphQLObjectType({
//     name: 'MatchScoresType',
//     fields: {
//         red: { type: GraphQLInt },
//         green: { type: GraphQLInt },
//         blue: { type: GraphQLInt },
//     }
// });
//
// const MatchObjectiveType = new GraphQLObjectType({
//     name: 'MatchObjectiveType',
//     fields: {
//         id: { type: GraphQLString },
//         type: { type: GraphQLString },
//         owner: { type: GraphQLString },
//         last_flipped: { type: GraphQLString },
//         claimed_by: { type: GraphQLString },
//         points_tick: { type: GraphQLInt },
//         points_capture: { type: GraphQLInt },
//         yaks_delivered: { type: GraphQLInt },
//         objective: {
//             type: ObjectiveType,
//             resolve: ({ id }) => getObjectives(id),
//         },
//     }
// });
//
// const MatchMapType = new GraphQLObjectType({
//     name: 'MatchMapType',
//     fields: {
//         id: { type: GraphQLString },
//         type: { type: GraphQLString },
//         deaths: { type: MatchScoresType },
//         kills: { type: MatchScoresType },
//         objectives: { type: new GraphQLList(MatchObjectiveType) }
//     }
// });
//
// const MatchType = new GraphQLObjectType({
//     name: 'MatchType',
//     fields: {
//         id: { type: GraphQLString },
//         start_time: { type: GraphQLString },
//         end_time: { type: GraphQLString },
//         scores: { type: MatchScoresType },
//         deaths: { type: MatchScoresType },
//         kills: { type: MatchScoresType },
//         victory_points: { type: MatchScoresType },
//         worlds: {
//             type: MatchWorldsType,
//             resolve: ({ worlds }) => Promise.props({
//                 red: worldsLoader.load(worlds.red),
//                 green: worldsLoader.load(worlds.green),
//                 blue: worldsLoader.load(worlds.blue),
//             })
//         },
//         maps: { type: new GraphQLList(MatchMapType) },
//     }
// });




// const MemberQuery = {
//     type: MemberType,
//     args: {
//         id: { type: GraphQLString },
//     },
//     resolve: (parent, params) => getMember(params),
// };

// const WorldsQuery = {
//     type: new GraphQLList(WorldType),
//     args: {
//         ids: { type: new GraphQLList(GraphQLID), }
//     },
//     resolve: (parent, { ids=["all"] }) => {
//         if (ids.indexOf('all') !== -1 || !Array.isArray(ids) || ids.length === 0) {
//             return fetchWorlds().then(ids => worldsLoader.loadMany(ids));
//         } else {
//             return worldsLoader.loadMany(ids);
//         }
//     },
// }
//
//
// const MatchQuery = {
//     type: MatchType,
//     args: {
//         id: { type: new GraphQLNonNull(GraphQLID), }
//     },
//     resolve: (parent, { id }) => matchesLoader.load(id),
// };
//
// const MatchesQuery = {
//     type: new GraphQLList(MatchType),
//     args: {
//         ids: { type: new GraphQLList(GraphQLID), }
//     },
//     resolve: (parent, { ids=["all"] }) => {
//         if (ids.indexOf('all') !== -1 || !Array.isArray(ids) || ids.length === 0) {
//             return fetch(`/v2/wvw/matches`).then(ids => matchesLoader.loadMany(ids));
//         } else {
//             return matchesLoader.loadMany(ids);
//         }
//     },
// };
//
//
// const ObjectiveQuery = {
//     type: ObjectiveType,
//     args: {
//         id: { type: new GraphQLNonNull(GraphQLID), }
//     },
//     resolve: (parent, { id }) => getObjectives(id),
// };
//
// const ObjectivesQuery = {
//     type: new GraphQLList(ObjectiveType),
//     args: {
//         ids: { type: new GraphQLList(GraphQLID), }
//     },
//     resolve: (parent, { ids=["all"] }) => getObjectives(ids),
// };

// const worldsLoader = new DataLoader(
//     worldIds => getWorlds(worldIds),
//     { cacheMap: LRU({ maxAge: CACHE_LONG })}
// );
//
// const matchesLoader = new DataLoader(
//     matchIds => getMatches(matchIds),
//     { cacheMap: LRU({ maxAge: CACHE_SHORT })}
// );
//
//
