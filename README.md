# busyQL

[Node.js](https://nodejs.org/en/) based [GraphQL](http://graphql.org/) wrapper for the [busybusy](https://busybusy.com/) REST API.


## Getting Started



1. Install Node.js ([https://nodejs.org/en/](https://nodejs.org/en/))
1. Install Yarn.js ([https://yarnpkg.com/en/docs/install](https://yarnpkg.com/en/docs/install))
1. Clone repo ([https://github.com/fooey/busyQL.git](https://github.com/fooey/busyQL.git)
1. Install dependencies, run `yarn install`  
1. Start in dev mode, run `yarn dev`  
  - Or, start in server mode, run `yarn start`  

Server will start on http://localhost:4000/  
GraphQL endpoint: http://localhost:4000/graphql  
GraphiQL editor: http://localhost:4000/graphiql  
GraphQL Schema: http://localhost:4000/schema  


## [Example Query](http://localhost:4000/graphiql?query=%7B%0A%20%20organization%20%7B%0A%20%20%20%20...orgProps%0A%20%20%20%20owner%20%7B%20...memberProps%20%7D%0A%20%20%7D%0A%20%20memberById%3Amember(id%3A%20%2292cccae3-2aac-43c2-b69e-fbca7e472118%22)%20%7B%0A%20%20%20%20...memberProps%0A%20%20%20%20organization%20%7B%0A%20%20%20%20%20%20...orgProps%0A%20%20%20%20%09owner%20%7B%0A%20%20%20%20%20%20%20%20...memberProps%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20%23%20members%3Amember%20%7B%0A%20%20%23%20%20%20...memberProps%0A%20%20%23%20%7D%0A%7D%0Afragment%20orgProps%20on%20OrganizationType%20%7B%0A%20%20%20%20id%0A%20%20%20%20organization_name%0A%20%20%20%20owned_by%0A%20%20%20%20updated_on%0A%20%20%20%20created_on%0A%20%20%20%20submitted_on%0A%20%20%20%20deleted_on%0A%7D%0Afragment%20memberProps%20on%20MemberType%20%7B%0A%20%20%20%20first_name%0A%20%20%20%20last_name%0A%20%20%20%20email%0A%20%20%20%20organization_id%0A%20%20%20%20position_id%0A%7D)
```
{
  organization {
    ...orgProps
    owner { ...memberProps }
  }
  memberById:member(id: "92cccae3-2aac-43c2-b69e-fbca7e472118") {
    ...memberProps
    organization {
      ...orgProps
    	owner {
        ...memberProps
      }
    }
  }
  # members:member {
  #   ...memberProps
  # }
}
fragment orgProps on OrganizationType {
    id
    organization_name
    owned_by
    updated_on
    created_on
    submitted_on
    deleted_on
}
fragment memberProps on MemberType {
    first_name
    last_name
    email
    organization_id
    position_id
}
```

### result

```
{
  "data": {
    "organization": {
      "id": "a6735855-8738-44e7-a3e9-403b9c1e4470",
      "organization_name": "Jason Rushton Enterprises",
      "owned_by": "92cccae3-2aac-43c2-b69e-fbca7e472118",
      "updated_on": 1493311251,
      "created_on": 1456358400,
      "submitted_on": 1456425889,
      "deleted_on": null,
      "owner": {
        "first_name": "Jason",
        "last_name": "Rushton",
        "email": "jasonr@busybusybusy.com",
        "organization_id": "a6735855-8738-44e7-a3e9-403b9c1e4470",
        "position_id": "1e65a68c-51fd-49f6-93d0-d87bd0a00aee"
      }
    },
    "memberById": {
      "first_name": "Jason",
      "last_name": "Rushton",
      "email": "jasonr@busybusybusy.com",
      "organization_id": "a6735855-8738-44e7-a3e9-403b9c1e4470",
      "position_id": "1e65a68c-51fd-49f6-93d0-d87bd0a00aee",
      "organization": {
        "id": "a6735855-8738-44e7-a3e9-403b9c1e4470",
        "organization_name": "Jason Rushton Enterprises",
        "owned_by": "92cccae3-2aac-43c2-b69e-fbca7e472118",
        "updated_on": 1493311251,
        "created_on": 1456358400,
        "submitted_on": 1456425889,
        "deleted_on": null,
        "owner": {
          "first_name": "Jason",
          "last_name": "Rushton",
          "email": "jasonr@busybusybusy.com",
          "organization_id": "a6735855-8738-44e7-a3e9-403b9c1e4470",
          "position_id": "1e65a68c-51fd-49f6-93d0-d87bd0a00aee"
        }
      }
    }
  }
}
```

### More Queries

```
query project($id: ID!) {
  project(id: $id) {
    ...projectProps
    
    parent_project{
      ...projectProps
      
      parent_project{
        ...projectProps
        
        parent_project{
          ...projectProps
        }
      }
    }
    
    root_project{
      ...projectProps
      
      child_projects {
        ...projectProps
      }
    }
  }
}

fragment projectProps on ProjectType {
    title
    id
}
```

```
query timeEntries($member_id: ID!) {
  openTimeEntries(
    member_id: $member_id, 
    start_time_gte: 1481792400,
  ) {
    # id
    start_time
    end_time
    project_id
    cost_code_id
    member_id
    
    project {
      id
      title
    }
  }
}
```

```
query member($id: ID!) {
  member(id: $id) {
    id
    first_name
    last_name
    email
    organization_id
    position_id
    
    timeEntries(start_time_gte: 1500000000) {
      start_time
      end_time
      project_id
      cost_code_id
      action_type
    }
    
    openTimeEntries {
      start_time
      end_time
      project_id
      cost_code_id
      action_type
    }
  }
}
```


```
{
  organization {
    id
    organization_name
    owned_by
    updated_on
    created_on
    submitted_on
    deleted_on
  }
}
```
