import { IDeck } from "./deckCards";

export class Board {
  private _cardsOnBoard: Array<IDeck>;
  public get cardsOnBoard() {
    return this._cardsOnBoard;
  }
  public set cardsOnBoard(value) {
    this._cardsOnBoard = value;
  }

  public constructor() {
    this.cardsOnBoard = [];
  }
  addToBoard(cards: Array<IDeck>): Array<IDeck> {
    const copyOfBoard = this.cardsOnBoard;
    this.cardsOnBoard = [...copyOfBoard, ...cards];
    return [...copyOfBoard, ...cards];
  }
  // clearBoard(): void {
  //   this.cardsOnBoard = [];
  // }
}
