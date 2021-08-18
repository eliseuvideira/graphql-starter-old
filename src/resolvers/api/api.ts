import { resolver } from "../../functions/resolver";

const api = resolver(async () => {
  const name = process.env.API_NAME || process.env.npm_package_name;
  const version = process.env.npm_package_version;
  const environment = process.env.NODE_ENV;

  return { name, version, environment };
});

export const resolvers = {
  Query: {
    api,
  },
};
