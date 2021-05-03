import { readdirSync } from "fs";
import { IResolvers } from "graphql-tools";
import { join } from "path";

const resolvers: IResolvers[] = [];

for (const file of readdirSync(__dirname)) {
  if (/^index.[jt]s$/.test(file)) {
    continue;
  }
  resolvers.push(require(join(__dirname, file)).resolvers);
}

export { resolvers };
