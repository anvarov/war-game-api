import { Board } from "./Board";
import { Player } from "./Player";

export class Game {
  private _winner: Player | undefined;
  private _board: Board;
  private _playerOne: Player;
  private _playerTwo: Player;

  public get playerTwo(): Player {
    return this._playerTwo;
  }
  public set playerTwo(value: Player) {
    this._playerTwo = value;
  }
  public get playerOne(): Player {
    return this._playerOne;
  }
  public set playerOne(value: Player) {
    this._playerOne = value;
  }
  private _gameStatus: "war" | "nowar";
  public get gameStatus(): "war" | "nowar" {
    return this._gameStatus;
  }
  public set gameStatus(value: "war" | "nowar") {
    this._gameStatus = value;
  }
  public get board(): Board {
    return this._board;
  }
  public set board(value: Board) {
    this._board = value;
  }
  public get winner() {
    return this._winner;
  }
  public set winner(value: Player) {
    this._winner = value;
  }

  public constructor(playerOne: Player, playerTwo: Player, board: Board) {
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.board = board;
    this.gameStatus = "nowar";
    this.winner = undefined;
  }
  nextMove(player: Player, numOfCards: number): void {
    const drawedCards = player.drawCards(numOfCards);
    if (drawedCards.length === 0) {
      this.winner =
        player.name === this.playerOne.name ? this.playerTwo : this.playerOne;
      return;
    }
    this.board.addToBoard(drawedCards);
  }
  play(): void {
    switch (this.gameStatus) {
      case "nowar":
        this.nextMove(this.playerOne, 1);
        if (this.winner) return;

        this.nextMove(this.playerTwo, 1);
        if (this.winner) return;

        this.compareCards();
        break;
      case "war":
        this.nextMove(this.playerOne, 3);
        if (this.winner) return;

        this.nextMove(this.playerTwo, 3);
        if (this.winner) return;

        this.nextMove(this.playerOne, 1);
        if (this.winner) return;

        this.nextMove(this.playerTwo, 1);
        if (this.winner) return;

        this.compareCards();
        break;
      default:
        throw new Error(
          "Unexpected behaviour, check your code something is very wrong"
        );
    }
  }
  compareCards(): void {
    const { cardsOnBoard } = this.board;
    const playerOneCardIdx = cardsOnBoard.length - 2;
    const playerTwoCardIdx = cardsOnBoard.length - 1;
    if (
      cardsOnBoard[playerTwoCardIdx].value >
      cardsOnBoard[playerOneCardIdx].value
    ) {
      this.gameStatus = "nowar";
      this.playerTwo.faceUpDeck.addToDeck(cardsOnBoard);
      this.board.cardsOnBoard = [];
      return;
    } else if (
      cardsOnBoard[playerTwoCardIdx].value <
      cardsOnBoard[playerOneCardIdx].value
    ) {
      this.gameStatus = "nowar";
      this.playerOne.faceUpDeck.addToDeck(cardsOnBoard);
      this.board.cardsOnBoard = [];
      return;
    } else {
      this.gameStatus = "war";
      return;
    }
  }
}
