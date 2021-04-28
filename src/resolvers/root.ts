import { join } from "path";
import { resolver, subscription } from "@ev-fns/graphql";
import pretty from "pretty-ms";
import _ from "lodash";

const { name, version } = require(join(__dirname, "..", "..", "package.json"));

const emojis = ["😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾"];
let _emoji = _.sample(emojis);
const randomize = () => _.sample(emojis.filter((e) => e !== _emoji));

const api = resolver(async () => ({ name, version }));

const emoji = resolver(async () => _emoji);

const emojiUpdate = resolver(async (_, args, { pubsub }) => {
  _emoji = randomize();
  pubsub.publish("emojiUpdated", { emojiUpdated: _emoji });
  return _emoji;
});

const emojiUpdated = subscription(async (_, args, { pubsub }) =>
  pubsub.asyncIterator("emojiUpdated")
);

export const resolvers = {
  Query: {
    api,
    emoji,
  },

  Mutation: {
    emojiUpdate,
  },

  Subscription: {
    emojiUpdated,
  },

  API: {
    uptime: () => pretty(process.uptime() * 1000),
  },
};
