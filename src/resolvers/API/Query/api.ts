import { auth } from "../../../functions/auth";
import { resolver } from "../../../functions/resolver";

const api = resolver<null, Record<string, never>>(
  auth(),
  resolver(async () => {
    return {
      name: process.env.API_NAME,
      version: process.env.npm_package_version,
      environment: process.env.NODE_ENV,
    };
  }),
);

export const resolvers = {
  Query: {
    api,
  },
};
