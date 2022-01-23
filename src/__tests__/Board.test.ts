import { Board } from "../Board";

const cards = [{ card: "9H", value: 7 }];
const initBoard = () => new Board();
describe("board", () => {
  it("should init board with correct params", () => {
    expect.hasAssertions();
    const board = initBoard();
    expect(board.cardsOnBoard).toHaveLength(0);
  });

  it("should add cards to board", () => {
    expect.hasAssertions();
    const board = initBoard();
    board.addToBoard(cards);
    expect(board.cardsOnBoard).toStrictEqual(cards);
  });
});
