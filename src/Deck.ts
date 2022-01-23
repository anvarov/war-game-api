import { IDeck } from "./deckCards";

export class Deck {
  private _cards: Array<IDeck>;
  public get cards(): Array<IDeck> {
    return this._cards;
  }
  public set cards(value: Array<IDeck>) {
    this._cards = value;
  }

  public constructor(cards?: Array<IDeck>) {
    // if (cards instanceof Array){
    // 	console.log(cards, 'cards inside constructor if')
    // 	this.cards = cards
    // }
    this.cards = cards ? cards : [];
  }
  shuffleDeck(cards: Array<IDeck>): Array<IDeck> {
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
  // removeOneFromDeck(): Array<IDeck> {
  // 	if (this.cards.length === 0){
  // 		return []
  // 	}
  //   const copyOfCards = [...this.cards];
  //   const removedCard = copyOfCards.pop();
  //   this.cards = copyOfCards;
  //   return [removedCard];
  // }

  // removeThreeFromDeck(): Array<IDeck> {
  //   const copyOfCards = [...this.cards];
  //   const playedCards = [];
  // 	for(let i = 0; )
  //   playedCards.push(copyOfCards.pop());
  //   playedCards.push(copyOfCards.pop());
  //   playedCards.push(copyOfCards.pop());
  //   this.cards = copyOfCards;
  //   return playedCards;
  // }
  addToDeck(cardsToAdd: Array<IDeck>): void {
    const copyOfCards = [...this.cards];
    this.cards = [...copyOfCards, ...cardsToAdd];
  }
}
