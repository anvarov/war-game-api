interface IDeck {
  card: string;
  value: number;
}
const DECK_CARDS: Array<IDeck> = [
  { card: "2H", value: 0 },
  { card: "2C", value: 0 },
  { card: "2S", value: 0 },
  { card: "2D", value: 0 },
  { card: "3H", value: 1 },
  { card: "3C", value: 1 },
  { card: "3S", value: 1 },
  { card: "3D", value: 1 },
  { card: "4H", value: 2 },
  { card: "4C", value: 2 },
  { card: "4S", value: 2 },
  { card: "4D", value: 2 },
  { card: "5H", value: 3 },
  { card: "5C", value: 3 },
  { card: "5S", value: 3 },
  { card: "5D", value: 3 },
  { card: "6H", value: 4 },
  { card: "6C", value: 4 },
  { card: "6S", value: 4 },
  { card: "6D", value: 4 },
  { card: "7H", value: 5 },
  { card: "7C", value: 5 },
  { card: "7S", value: 5 },
  { card: "7D", value: 5 },
  { card: "8H", value: 6 },
  { card: "8C", value: 6 },
  { card: "8S", value: 6 },
  { card: "8D", value: 6 },
  { card: "9H", value: 7 },
  { card: "9C", value: 7 },
  { card: "9S", value: 7 },
  { card: "9D", value: 7 },
  { card: "10H", value: 8 },
  { card: "10C", value: 8 },
  { card: "10S", value: 8 },
  { card: "10D", value: 8 },
  { card: "JH", value: 9 },
  { card: "JC", value: 9 },
  { card: "JS", value: 9 },
  { card: "JD", value: 9 },
  { card: "QH", value: 10 },
  { card: "QC", value: 10 },
  { card: "QS", value: 10 },
  { card: "QD", value: 10 },
  { card: "KH", value: 11 },
  { card: "KC", value: 11 },
  { card: "KS", value: 11 },
  { card: "KD", value: 11 },
  { card: "AH", value: 12 },
  { card: "AC", value: 12 },
  { card: "AS", value: 12 },
  { card: "AD", value: 12 },
];
const shuffleDeck = (cards: Array<IDeck>): Array<IDeck> => {
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
};
const shuffledDeck = shuffleDeck(DECK_CARDS);
const firstHalfDeck = shuffledDeck.splice(0, 26);
const secondHalfDeck = shuffledDeck;
export { firstHalfDeck, secondHalfDeck, IDeck, shuffleDeck };
