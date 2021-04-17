import { gql } from "apollo-server-core";

const movies = [
  { movieId: 1, title: "Movie 1" },
  { movieId: 2, title: "Movie 2" },
];

export const typeDefs = gql`
  type Movie {
    movieId: String
    title: String
  }

  extend type Query {
    movies: [Movie]
  }
`;

export const resolvers = {
  Query: {
    movies: () => movies,
  },
};
