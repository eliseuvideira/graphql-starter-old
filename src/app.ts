import express from "express";
import cors from "cors";
import { exception, notFound } from "@ev-fns/errors";
import apollo from "./apollo";
import { upload } from "./middlewares/upload";

const app = express();

app.use(cors());

app.get("/", (req, res) => res.redirect("/graphql"));
app.use(upload);
app.use(apollo);

app.use(notFound);
app.use(exception);

export default app;
