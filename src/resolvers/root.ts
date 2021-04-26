import { join } from "path";
import { resolver } from "../functions/resolver";
import pretty from "pretty-ms";
import { subscription } from "../functions/subscription";
import _ from "lodash";

const { name, version } = require(join(__dirname, "..", "..", "package.json"));

const emojis = ["😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾"];
let _emoji = _.sample(emojis);
const randomize = () => _.sample(emojis.filter((e) => e !== _emoji));

const api = resolver(() => ({ name, version }));

const emoji = resolver(() => _emoji);

const emojiUpdate = resolver((_, args, { pubsub }) => {
  _emoji = randomize();
  pubsub.publish("emojiUpdated", { emojiUpdated: _emoji });
  return _emoji;
});

const emojiUpdated = subscription((_, args, { pubsub }) =>
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
