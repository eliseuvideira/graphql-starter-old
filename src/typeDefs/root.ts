import { gql } from "apollo-server-core";

export const typeDefs = gql`
  scalar Upload
  scalar DateTime

  type Query {
    api: API!
    emoji: String!
  }

  type Mutation {
    emojiUpdate: String!
  }

  type Subscription {
    emojiUpdated: String!
  }

  type API {
    name: String!
    version: String!
    uptime: String!
  }
`;
