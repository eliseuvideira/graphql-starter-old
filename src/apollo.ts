import fs from "fs";
import path from "path";
import { ApolloServer, gql } from "apollo-server-express";
import _ from "lodash";

const typeDefs = [
  gql`
    type Query {
      _empty: String
    }
  `,
];
const resolvers = [];

const schemas = fs.readdirSync(path.join(__dirname, "schemas"));
for (const schema of schemas) {
  const content = require(path.join(__dirname, "schemas", schema));
  typeDefs.push(content.typeDefs);
  resolvers.push(content.resolvers);
}

const apolloServer = new ApolloServer({ typeDefs, resolvers });

const apollo = apolloServer.getMiddleware();

export default apollo;
