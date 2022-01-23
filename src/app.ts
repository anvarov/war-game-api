import { Game } from "./Game";
import { Player } from "./Player";
import { Board } from "./Board";
import { Deck } from "./Deck";
import { firstHalfDeck, secondHalfDeck } from "./deckCards";

const playerOne = new Player("Akmal", new Deck(), new Deck(firstHalfDeck));
const playerTwo = new Player("Anvarov", new Deck(), new Deck(secondHalfDeck));
const board = new Board();
const game = new Game(playerOne, playerTwo, board);

while (!game.winner) {
  game.play();
}
if (game.winner === playerOne) {
  playerOne.faceUpDeck.addToDeck([
    ...game.board.cardsOnBoard,
    ...playerTwo.faceDownDeck.cards,
  ]);
  playerOne.faceDownDeck.addToDeck(playerOne.faceUpDeck.cards);
  playerOne.faceUpDeck.cards = [];
  game.board.cardsOnBoard = [];
} else {
  playerTwo.faceUpDeck.addToDeck([
    ...game.board.cardsOnBoard,
    ...playerOne.faceDownDeck.cards,
  ]);
  playerTwo.faceDownDeck.addToDeck(playerTwo.faceUpDeck.cards);
  playerTwo.faceUpDeck.cards = [];
  game.board.cardsOnBoard = [];
}

console.log(game.winner.name);
console.log(game.winner.faceDownDeck.cards, "facedowncards");
console.log(game.winner.faceDownDeck.cards.length, "lenth");
console.log(game.winner.faceUpDeck.cards, "faceupcards");
console.log(game.board.cardsOnBoard, "on board cards");
console.log(game.playerOne.faceDownDeck.cards, "player one face down cards");
console.log(game.playerOne.faceUpDeck.cards, "player one face up cards");
console.log(game.history, "game history");
