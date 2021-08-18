import fs from "fs";
import path from "path";
import { createApollo } from "@ev-graphql/apollo";
import { DocumentNode } from "graphql";
import { Context, context } from "./context";

const TYPE_DEFS_PATH = path.join(__dirname, "..", "typeDefs");
const RESOLVERS_PATH = path.join(__dirname, "..", "resolvers");

const typeDefs: DocumentNode[] = [];

for (const file of fs.readdirSync(TYPE_DEFS_PATH)) {
  const FILEPATH = path.join(TYPE_DEFS_PATH, file);

  typeDefs.push(require(FILEPATH).typeDefs);
}

const resolvers = [];

for (const folder of fs.readdirSync(RESOLVERS_PATH)) {
  const RESOLVER_PATH = path.join(RESOLVERS_PATH, folder);

  for (const file of fs.readdirSync(RESOLVER_PATH)) {
    const FILEPATH = path.join(RESOLVER_PATH, file);

    resolvers.push(require(FILEPATH).resolvers);
  }
}

export const apollo = createApollo<Context>({
  typeDefs,
  resolvers,
  context,
});
