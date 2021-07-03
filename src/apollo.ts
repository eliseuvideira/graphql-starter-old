import fs from "fs";
import path from "path";
import { createApollo } from "@ev-graphql/apollo";
import { DocumentNode } from "apollo-link";
import { IResolvers } from "graphql-tools";

const typeDefs: DocumentNode[] = [];

for (const file of fs.readdirSync(path.join(__dirname, "typeDefs"))) {
  typeDefs.push(require(path.join(__dirname, "typeDefs", file)).typeDefs);
}

const resolvers: IResolvers[] = [];

for (const file of fs.readdirSync(path.join(__dirname, "resolvers"))) {
  resolvers.push(require(path.join(__dirname, "resolvers", file)).resolvers);
}

export const apollo = createApollo({
  typeDefs,
  resolvers,
});
