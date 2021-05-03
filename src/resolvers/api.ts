import { join } from "path";
import { resolver } from "@ev-fns/graphql";
import pretty from "pretty-ms";

const { name, version } = require(join(__dirname, "..", "..", "package.json"));

const api = resolver(async () => ({
  name: process.env.API_NAME || name,
  version,
}));

const uptime = resolver(async () => pretty(process.uptime() * 1000));

export const resolvers = {
  Query: {
    api,
  },

  API: {
    uptime,
  },
};
