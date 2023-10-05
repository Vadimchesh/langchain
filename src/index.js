import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import trainBot from "./trainBot.js";
import getAnswer from "./getAnswer.js";

dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.get("/train-bot", trainBot);
app.post("/get-answer", getAnswer);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
