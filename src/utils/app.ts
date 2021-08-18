import express from "express";
import cors from "cors";
import { exception, notFound } from "@ev-fns/errors";
import { apollo } from "./apollo";
import http from "http";
import playground from "graphql-playground-middleware-express";

export const app = express();

export const middlewares = async (
  server: http.Server,
  app: express.Express,
) => {
  app.use(cors());

  if (process.env.NODE_ENV !== "production") {
    app.get("/", (req, res) => res.redirect("/graphql"));
    app.get("/graphql", playground({ endpoint: "/graphql" }));
  }

  app.post("/graphql", apollo.upload());
  app.post("/graphql", apollo.middleware());

  apollo.subscriptions(server);

  app.use(notFound);
  app.use(exception);
};
