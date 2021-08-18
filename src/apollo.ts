import fs from "fs";
import path from "path";
import { createApollo } from "@ev-graphql/apollo";
import { DocumentNode } from "graphql";
import { Context, context } from "./utils/context";

const typeDefs: DocumentNode[] = [];

for (const file of fs.readdirSync(path.join(__dirname, "typeDefs"))) {
  typeDefs.push(require(path.join(__dirname, "typeDefs", file)).typeDefs);
}

const resolvers = [];

const resolversPath = path.join(__dirname, "resolvers");
for (const resolver of fs.readdirSync(resolversPath)) {
  const resolverPath = path.join(resolversPath, resolver);

  for (const file of fs.readdirSync(resolverPath)) {
    resolvers.push(require(path.join(resolverPath, file)).resolvers);
  }
}

export const apollo = createApollo<Context>({
  typeDefs,
  resolvers,
  context,
});
