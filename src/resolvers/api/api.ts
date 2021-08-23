import { auth } from "../../functions/auth";
import { resolver } from "../../functions/resolver";

const api = resolver<null, Record<string, never>>(
  auth(),
  resolver(async () => {
    const name = process.env.API_NAME;
    const version = process.env.npm_package_version;
    const environment = process.env.NODE_ENV;

    return { name, version, environment };
  }),
);

export const resolvers = {
  Query: {
    api,
  },
};
