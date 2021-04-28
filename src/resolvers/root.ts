import { join } from "path";
import { resolver, subscription } from "@ev-fns/graphql";
import pretty from "pretty-ms";
import { sample } from "lodash";

const STATUS = ["😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾"];
let _status = sample(STATUS);

const { name, version } = require(join(__dirname, "..", "..", "package.json"));

const api = resolver(async () => ({ name, version }));

const status = resolver(async () => _status);

const statusUpdate = resolver(async (_, args, { pubsub }) => {
  _status = sample(STATUS.filter((x) => x !== _status));
  pubsub.publish("emojiUpdated", { statusUpdated: _status });
  return _status;
});

const statusUpdated = subscription(async (_, args, { pubsub }) =>
  pubsub.asyncIterator("emojiUpdated")
);

export const resolvers = {
  Query: {
    api,
    status,
  },

  Mutation: {
    statusUpdate,
  },

  Subscription: {
    statusUpdated,
  },

  API: {
    uptime: () => pretty(process.uptime() * 1000),
  },
};
