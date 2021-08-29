import fs from "fs";
import path from "path";
import { createApollo } from "@ev-graphql/apollo";
import { DocumentNode } from "graphql";
import { Context, context } from "./context";
import { gql } from "apollo-server-core";

const ROOT_TYPE_DEFS = gql`
  scalar AnyObject

  input PaginationInput {
    offset: Int
    limit: Int
  }

  input SortInput {
    column: String!
    order: String
  }
`;

const TYPE_DEFS_PATH = path.join(__dirname, "..", "typeDefs");
const RESOLVERS_PATH = path.join(__dirname, "..", "resolvers");

const typeDefs: DocumentNode[] = [ROOT_TYPE_DEFS];

for (const folder of fs.readdirSync(TYPE_DEFS_PATH)) {
  const TYPEDEFS_FOLDER = path.join(TYPE_DEFS_PATH, folder);

  for (const item of fs.readdirSync(TYPEDEFS_FOLDER)) {
    const ITEM_PATH = path.join(TYPEDEFS_FOLDER, item);

    const stat = fs.statSync(ITEM_PATH);

    if (stat.isFile()) {
      typeDefs.push(require(ITEM_PATH).typeDefs);
    } else {
      for (const file of fs.readdirSync(ITEM_PATH)) {
        const FILE_PATH = path.join(ITEM_PATH, file);

        typeDefs.push(require(FILE_PATH).typeDefs);
      }
    }
  }
}

const resolvers = [];

for (const folder of fs.readdirSync(RESOLVERS_PATH)) {
  const RESOLVERS_FOLDER = path.join(RESOLVERS_PATH, folder);

  for (const type of fs.readdirSync(RESOLVERS_FOLDER)) {
    const RESOLVER_PATH = path.join(RESOLVERS_FOLDER, type);

    for (const file of fs.readdirSync(RESOLVER_PATH)) {
      const FILEPATH = path.join(RESOLVER_PATH, file);

      resolvers.push(require(FILEPATH).resolvers);
    }
  }
}

export const apollo = createApollo<Context>({
  typeDefs,
  resolvers,
  context,
});
