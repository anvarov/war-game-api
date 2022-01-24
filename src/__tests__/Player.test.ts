import { Player } from "../Player";
import { Deck, IDeck } from "../Deck";

const cards = [
  { card: "3S", value: 1 },
  { card: "3D", value: 1 },
  { card: "4H", value: 2 },
  { card: "4C", value: 2 },
  { card: "4S", value: 2 },
];

const notEnoughCards = [
  { card: "3S", value: 1 },
  { card: "3D", value: 1 },
];

const playerName = "test";
const initPlayer = (cards: IDeck[], faceUpCards: IDeck[]) => {
  return new Player(playerName, new Deck(faceUpCards), new Deck(cards));
};

describe("player", () => {
  it("should initialize new player", () => {
    expect.hasAssertions();
    const player = initPlayer(cards, []);
    expect(player.name).toStrictEqual(playerName);
    expect(player.faceUpDeck.cards).toStrictEqual([]);
    expect(player.faceDownDeck.cards).toStrictEqual(cards);
  });

  it("should draw one card from player faceDownDeck", () => {
    expect.hasAssertions();
    const player = initPlayer(cards, []);
    const drawedCard = player.drawCards(1);
    expect(player.faceDownDeck.cards).toStrictEqual(cards.slice(0, -1));
    expect(drawedCard).toStrictEqual(cards.slice(-1));
  });

  it("should draw three cards from player faceDownDeck", () => {
    expect.hasAssertions();
    const player = initPlayer(cards, []);
    const drawedCards = player.drawCards(3);
    expect(player.faceDownDeck.cards).toStrictEqual(cards.slice(0, -3));
    expect(drawedCards).toStrictEqual(cards.slice(-3));
  });

  it(`should shuffle faceUpDeck and put cards into faceDown deck, 
	when there is not enough cards in faceDown deck for a move`, () => {
    expect.hasAssertions();
    const player = initPlayer([], cards);
    const drawedCards = player.drawCards(3);
    expect(drawedCards).toHaveLength(3);
    expect(player.faceUpDeck.cards).toHaveLength(0);
    expect(player.faceDownDeck.cards).toHaveLength(cards.length - 3);
  });

  it("should return an empty array if there is not enough cards", () => {
    expect.hasAssertions();
    const player = initPlayer([], notEnoughCards);
    const drawedCards = player.drawCards(3);
    expect(drawedCards).toHaveLength(0);
  });
});
