import { dotenv } from "@ev-fns/dotenv";

dotenv();

import server from "@ev-fns/server";
import { apollo } from "./utils/apollo";
import { app, middlewares } from "./utils/app";
import { database } from "./utils/database";

const PORT = +process.env.PORT || 3000;

server({
  app,
  port: PORT,
  before: async (server) => {
    await database.raw(`select 1 as "serverStatus";`);

    if (+process.env.MIGRATIONS_ENABLED) {
      await database.migrate.latest();
    }

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
