import express from "express";
import cors from "cors";
import { exception, notFound } from "@ev-fns/errors";
import { apollo } from "./apollo";

const app = express();

app.use(cors());

app.get("/", (req, res) => res.redirect("/graphql"));
app.use(apollo.upload());
app.use(apollo.middleware());

app.use(notFound);
app.use(exception);

export default app;
