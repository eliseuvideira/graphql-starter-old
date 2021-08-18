import { gql } from "apollo-server-core";

export const typeDefs = gql`
  extend type Query {
    packages(
      pagination: PaginationInput
      sort: [SortInput!]
      filter: PackageFilterInput
    ): [Package!]!
    package(_id: ID!): Package
  }

  extend type Mutation {
    createPackage(input: CreatePackageInput!): Package!
    updatePackage(_id: ID!, input: UpdatePackageInput!): Package
    deletePackage(_id: ID!): Package
  }

  type Package {
    _id: String!
    name: String!
    version: String!
    license: String!
    description: String!
    homepage: String!
    repository: String!
    downloads: Int!
  }

  input PackageFilterInput {
    eq: PackageFilterEqInput
    like: PackageFilterLikeInput
    in: PackageFilterInInput
    null: [String!]
    notnull: [String!]
  }

  input PackageFilterEqInput {
    _id: String
    name: String
    version: String
    license: String
    description: String
    homepage: String
    repository: String
    downloads: Int
  }

  input PackageFilterLikeInput {
    name: String
    version: String
    license: String
    description: String
    homepage: String
    repository: String
  }

  input PackageFilterInInput {
    _id: [String!]
    name: [String!]
    version: [String!]
    license: [String!]
    description: [String!]
    homepage: [String!]
    repository: [String!]
    downloads: [Int!]
  }

  input CreatePackageInput {
    name: String!
    version: String!
    license: String!
    description: String!
    homepage: String!
    repository: String!
    downloads: Int!
  }

  input UpdatePackageInput {
    name: String
    version: String
    license: String
    description: String
    homepage: String
    repository: String
    downloads: Int
  }
`;
