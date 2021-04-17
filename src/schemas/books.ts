import { gql } from "apollo-server-core";

const books = [
  { bookId: 1, title: "Book 1" },
  { bookId: 2, title: "Book 2" },
];

export const typeDefs = gql`
  type Book {
    bookId: String
    title: String
  }

  extend type Query {
    books: [Book]
  }
`;

export const resolvers = {
  Query: {
    books: () => books,
  },
};
