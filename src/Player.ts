import { Deck, IDeck } from "./Deck";

export class Player {
  private _faceUpDeck: Deck;
  private _faceDownDeck: Deck;
  private _name: string;
  public get faceDownDeck(): Deck {
    return this._faceDownDeck;
  }
  public set faceDownDeck(deck: Deck) {
    this._faceDownDeck = deck;
  }
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }
  public get faceUpDeck(): Deck {
    return this._faceUpDeck;
  }
  public set faceUpDeck(value: Deck) {
    this._faceUpDeck = value;
  }

  public constructor(name: string, faceUpDeck: Deck, faceDownDeck: Deck) {
    this.faceUpDeck = faceUpDeck;
    this.faceDownDeck = faceDownDeck;
    this.name = name;
  }

  public drawCards(numberOfCards: number): IDeck[] {
    if (this.faceDownDeck.cards.length < numberOfCards) {
      const copyOfFaceUpDeck = [...this.faceUpDeck.cards];
      const shuffledFaceUpDeck = Deck.shuffleDeck(copyOfFaceUpDeck);
      this.faceUpDeck.cards = [];
      this.faceDownDeck.cards = [
        ...this.faceDownDeck.cards,
        ...shuffledFaceUpDeck,
      ];
    }
    const drawedCards = this.faceDownDeck.cards.slice(-numberOfCards);
    if (drawedCards.length < numberOfCards) return [];
    this.faceDownDeck.cards = this.faceDownDeck.cards.slice(0, -numberOfCards);
    return drawedCards;
  }
}
