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
  makeMove(player: Player, moves: number) {
    if (
      player.faceDownDeck.cards.length < moves &&
      player.faceUpDeck.cards.length > moves
    ) {
      const faceUpDeckCards = player.faceUpDeck.shuffleDeck([
        ...player.faceUpDeck.cards,
      ]);
      player.faceUpDeck.cards = [];
      player.faceDownDeck.cards = faceUpDeckCards;
    } else if (
      player.faceDownDeck.cards.length < moves &&
      player.faceUpDeck.cards.length < moves
    ) {
      this.winner =
        player.name === this.playerOne.name ? this.playerTwo : this.playerOne;
      return;
    }
    const playedCard =
      moves === 1
        ? player.faceDownDeck.removeOneFromDeck()
        : player.faceDownDeck.removeThreeFromDeck();
    this.board.addToBoard(playedCard);
  }
  play(): void {
    switch (this.gameStatus) {
      case "nowar":
        this.makeMove(this.playerOne, 1);
        this.makeMove(this.playerTwo, 1);
        if (this.winner) break;
        this.findWinner();
        break;
      case "war":
        this.makeMove(this.playerOne, 3);
        this.makeMove(this.playerTwo, 3);
        this.makeMove(this.playerOne, 1);
        this.makeMove(this.playerTwo, 1);
        if (this.winner) break;
        this.findWinner();
        break;
      default:
        throw new Error(
          "Unexpected behaviour, check your code something is very wrong"
        );
    }
  }
  findWinner(): Player | void {
    const { cardsOnBoard } = this.board;
    // console.log(cardsOnBoard, 'cardsonboard')
    if (
      cardsOnBoard[cardsOnBoard.length - 1].value >
      cardsOnBoard[cardsOnBoard.length - 2].value
    ) {
      this.gameStatus = "nowar";
      this.playerTwo.faceUpDeck.addToDeck(cardsOnBoard);
      this.board.clearBoard();
      return this.playerTwo;
    } else if (
      cardsOnBoard[cardsOnBoard.length - 1].value <
      cardsOnBoard[cardsOnBoard.length - 2].value
    ) {
      this.gameStatus = "nowar";
      this.playerOne.faceUpDeck.addToDeck(cardsOnBoard);
      this.board.clearBoard();
      return this.playerOne;
    } else {
      this.gameStatus = "war";
      return;
    }
  }
}
