import { gql } from "apollo-server-core";

export const typeDefs = gql`
  scalar Upload
  scalar DateTime

  type Query {
    api: API!
    status: String!
  }

  type Mutation {
    statusUpdate: String!
  }

  type Subscription {
    statusUpdated: String!
  }

  type API {
    name: String!
    version: String!
    uptime: String!
  }
`;
