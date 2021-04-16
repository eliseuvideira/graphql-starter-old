import http from "http";
import app from "./app";

(async () => {
  const server = http.createServer(app);

  const port = +(process.env.PORT || 3000);

  await new Promise<void>((resolve, reject) => {
    server.on("error", reject);
    server.on("listening", resolve);
    server.listen(port);
  });

  console.info(`listening at http://localhost:${port}`);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
