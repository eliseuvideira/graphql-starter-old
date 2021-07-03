import dotenv from "@ev-fns/dotenv";

dotenv({}, ({ NODE_ENV, npm_package_version }) => {
  console.info(`🌟 ${NODE_ENV}`);
  console.info(`🔖 ${npm_package_version}`);
});

import server from "@ev-fns/server";
import { apollo } from "./apollo";
import app from "./app";

const PORT = +process.env.PORT || 3000;

server({
  app,
  port: PORT,
  before: async (server) => {
    apollo.subscriptions(server);
  },
  after: async () => {
    console.info(`🚀 http://localhost:${PORT}`);
  },
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
