import dotenv from "@ev-fns/dotenv";

dotenv({}, ({ NODE_ENV, npm_package_version }) => {
  console.info(NODE_ENV);
  console.info(npm_package_version);
});

import server from "@ev-fns/server";
import app from "./app";

const port = +(process.env.PORT || 3000);

server({
  app,
  port,
  before: async () => {},
  after: async () => {
    console.info(`http://localhost:${port}`);
  },
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
