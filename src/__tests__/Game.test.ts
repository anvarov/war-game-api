import { Game } from "../Game";
import { Player } from "../Player";
import { Board } from "../Board";
import { Deck } from "../Deck";
import { firstHalfDeck, secondHalfDeck } from "../deckCards";

const initGame = () => {
  return new Game(
    new Player(playerOneName, new Deck([]), new Deck(firstHalfDeck)),
    new Player(playerTwoName, new Deck([]), new Deck(secondHalfDeck)),
    new Board()
  );
};
const playerOneName = "playerOne";
const playerTwoName = "playerTwo";
describe("game", () => {
  it("should create a game with valid state", () => {
    expect.hasAssertions();
    const game = initGame();
    expect(game.gameStatus).toBe("nowar");
    expect(game.playerOne.name).toBe(playerOneName);
    expect(game.playerTwo.name).toBe(playerTwoName);
  });

  it("should add card to board when gameStatus is nowar", () => {
    expect.hasAssertions();
    const game = initGame();
    game.nextMove(game.playerOne, 1);
    expect(game.board.cardsOnBoard).toHaveLength(1);
  });

  it("should add 3 cards to board when gameStatus is war", () => {
    expect.hasAssertions();
    const game = initGame();
    game.gameStatus = "war";
    game.nextMove(game.playerOne, 3);
    expect(game.board.cardsOnBoard).toHaveLength(3);
  });

  it("should compare cards correctly", () => {
    expect.hasAssertions();
    const game = initGame();
    game.playerOne.faceDownDeck.cards = [{ card: "AH", value: 12 }];
    game.playerTwo.faceDownDeck.cards = [{ card: "KH", value: 11 }];

    game.nextMove(game.playerOne, 1);
    game.nextMove(game.playerTwo, 1);
    game.compareCards();
    expect(game.gameStatus).toBe("nowar");
    expect(game.winner).toBeUndefined();
    expect(game.playerOne.faceUpDeck.cards).toStrictEqual([
      { card: "AH", value: 12 },
      { card: "KH", value: 11 },
    ]);
  });

  it("should play one round", () => {
    expect.hasAssertions();
    const game = initGame();
    game.play();
    expect(game.board.cardsOnBoard).toStrictEqual([]);
  });
});
