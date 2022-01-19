import express from "express";
import helmet from "helmet";
const app = express();
const port = 3000;

app.use(helmet());

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.listen(port, () => {
  console.log("example app is running");
});
