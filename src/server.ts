/* eslint-disable jest/require-hook */
import * as express from "express";
import Helmet from "helmet";

const app = express.default();
app.use(Helmet());

app.get("/", (req, res) => {
  res.send("wokrs");
});
