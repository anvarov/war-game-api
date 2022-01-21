import { Game } from "./Game";
import { Player } from "./Player";
import { Board } from "./Board";
import { Deck } from "./Deck";
import { firstHalfDeck, secondHalfDeck } from "./deckCards";

// console.log(firstHalfDeck, 'firstHalfDeck')
// console.log(secondHalfDeck, 'secondHalfDeck')

const playerOne = new Player("Akmal", new Deck(), new Deck(firstHalfDeck));
const playerTwo = new Player("Anvarov", new Deck(), new Deck(secondHalfDeck));
const board = new Board();
const game = new Game(playerOne, playerTwo, board);
while (!game.winner) {
  game.play();
}
if (game.winner === playerOne) {
  playerOne.faceUpDeck.addToDeck(game.board.cardsOnBoard);
  playerOne.faceDownDeck.addToDeck(playerOne.faceUpDeck.cards);
  playerOne.faceUpDeck.cards = [];
  game.board.clearBoard();
} else {
  playerTwo.faceUpDeck.addToDeck(game.board.cardsOnBoard);
  playerTwo.faceDownDeck.addToDeck(playerTwo.faceUpDeck.cards);
  playerTwo.faceUpDeck.cards = [];
  game.board.clearBoard();
}

console.log(game.winner.name);
console.log(game.winner.faceDownDeck.cards, "facedowncards");
console.log(game.winner.faceDownDeck.cards.length, "lenth");
console.log(game.winner.faceUpDeck.cards, "faceupcards");
