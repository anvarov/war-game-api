import "dotenv/config";
import * as express from "express";
import { NextFunction, Request, Response } from "express";
import Helmet from "helmet";

import { MongoClient, MongoClientOptions } from "mongodb";
import { Game } from "./Game";
import { Board } from "./Board";
import { Player } from "./Player";
import { Deck } from "./Deck";
import { firstHalfDeck, secondHalfDeck } from "./deckCards";

class HttpException extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

const uri = `mongodb+srv://gameAdmin:${process.env.PASSWORD}@mycluster.b6zvr.mongodb.net/wargame?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as MongoClientOptions);
const app = express.default();
const port = process.env.PORT ? process.env.PORT : 3000;

app.use(Helmet());
app.get(
  "/simulateGame",
  async (_req: Request, res: Response, next: NextFunction) => {
    let winner: string;
    try {
      await client.connect();
      const db = client.db(process.env.DB);
      const games = db.collection("games");
      const players = db.collection("players");
      const game = new Game(
        new Player("Akmal", new Deck([]), new Deck(firstHalfDeck)),
        new Player("Anvarov", new Deck([]), new Deck(secondHalfDeck)),
        new Board()
      );
      while (!game.winner) {
        game.play();
      }
      winner = game.winner.name;
      await games.insertOne({
        winner,
      });

      if (winner === "Akmal") {
        await players.updateOne({ playerName: "Akmal" }, { $inc: { wins: 1 } });
      } else {
        await players.updateOne(
          { playerName: "Anvarov" },
          { $inc: { wins: 1 } }
        );
      }
    } catch (err) {
      return next(err);
    } finally {
      await client.close();
      res.json({ winner });
    }
  }
);

app.get(
  "/getPlayers",
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      await client.connect();
      const db = client.db(process.env.DB);
      const players = db.collection("players");
      const data = await players.find({}).toArray();
      res.json({ data });
    } catch (err) {
      next(err);
    } finally {
      await client.close();
    }
  }
);

app.use((req, res) => {
  res.send("<h1> Page not found </h1>");
});

app.use(function (error: HttpException, request: Request, response: Response) {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  response.status(status).send({
    status,
    message,
  });
});

app.listen(port, () => {
  console.log("server is running on port " + port);
});
