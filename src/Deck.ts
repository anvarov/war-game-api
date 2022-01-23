export interface IDeck {
  card: string;
  value: number;
}

export class Deck {
  private _cards: Array<IDeck>;
  public get cards(): Array<IDeck> {
    return this._cards;
  }
  public set cards(value: Array<IDeck>) {
    this._cards = value;
  }

  public constructor(cards?: Array<IDeck>) {
    this.cards = cards ? cards : [];
  }
  static shuffleDeck(cards: Array<IDeck>): Array<IDeck> {
    const deck = cards;
    let currentIndex = deck.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [deck[currentIndex], deck[randomIndex]] = [
        deck[randomIndex],
        deck[currentIndex],
      ];
    }

    return deck;
  }

  addToDeck(cardsToAdd: Array<IDeck>): void {
    const copyOfCards = [...this.cards];
    this.cards = [...copyOfCards, ...cardsToAdd];
  }
}
