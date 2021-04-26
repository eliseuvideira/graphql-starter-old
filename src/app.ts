import express from "express";
import cors from "cors";
import { exception, notFound } from "@ev-fns/errors";

const app = express();

app.use(cors());

app.get("/", (req, res) => res.redirect("/graphql"));

app.use(notFound);
app.use(exception);

export default app;
