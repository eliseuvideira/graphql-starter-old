import { gql } from "apollo-server-core";

export const typeDefs = gql`
  type API {
    name: String!
    version: String!
    environment: String!
  }
`;
