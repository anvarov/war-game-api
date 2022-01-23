import { Deck, IDeck } from "../Deck";
import { firstHalfDeck } from "../deckCards";

const initDeck = (cards: IDeck[]) => {
  return new Deck(cards);
};
describe("deck object", () => {
  it("should initialize cards", () => {
    expect.hasAssertions();
    const deck = initDeck(firstHalfDeck);
    expect(deck).toHaveProperty("cards");
    expect(deck.cards).toStrictEqual(firstHalfDeck);
  });
  it("should add new cards to existing cards", () => {
    expect.hasAssertions();
    const deck = initDeck(firstHalfDeck);
    deck.addToDeck(firstHalfDeck);
    expect(deck.cards).toStrictEqual([...firstHalfDeck, ...firstHalfDeck]);
  });

  it("should initialize to empty array if cards not passed", () => {
    expect.hasAssertions();
    const deck = new Deck();
    expect(deck.cards).toStrictEqual([]);
  });
});
