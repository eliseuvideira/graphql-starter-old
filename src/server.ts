import { dotenv } from "@ev-fns/dotenv";

dotenv();

import server from "@ev-fns/server";
import { apollo } from "./apollo";
import app, { middlewares } from "./app";

const PORT = +process.env.PORT || 3000;

server({
  app,
  port: PORT,
  before: async (server) => {
    await apollo.server.start();

    await middlewares(server, app);
  },
  after: async () => {
    console.info(`🚀 http://localhost:${PORT}`);
  },
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
