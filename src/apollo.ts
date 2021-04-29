import { resolvers } from "./resolvers/api";
import { typeDefs } from "./typeDefs/api";
import { createApollo } from "@ev-fns/graphql";

const MAX_FILE_SIZE = 50 * 1024 * 1024;
const MAX_FILES = 1;

export const { apollo, apolloUpload, installSubscriptions } = createApollo({
  typeDefs,
  resolvers,
  maxFileSize: MAX_FILE_SIZE,
  maxFiles: MAX_FILES,
});
