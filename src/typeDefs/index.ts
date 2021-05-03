import { DocumentNode } from "apollo-link";
import { readdirSync } from "fs";
import { join } from "path";

const typeDefs: DocumentNode[] = [];

for (const file of readdirSync(__dirname)) {
  if (/^index.[jt]s$/.test(file)) {
    continue;
  }
  typeDefs.push(require(join(__dirname, file)).typeDefs);
}

export { typeDefs };
