class Game {
  private state: State;
  constructor(state: State) {
    this.setState(state);
  }

  public setState(state: State): void {
    this.state = state;
    this.state.setGame(this);
  }

  public getState(): State {
    return this.state;
  }

  public calculateWinner(board: string[]): void {
    if (board[board.length - 1] > board[board.length - 2]) {
      this.state.setWarState("nowar");
      this.state.getPlayerTwo().setFaceUpDeck(board);
    } else if (board[board.length - 1] < board[board.length - 2]) {
      this.state.setWarState("nowar");
      this.state.getPlayerOne().setFaceUpDeck(board);
    } else {
      this.state.setWarState("war");
    }
  }
  public play(): void {
    const playerOne = this.state.getPlayerOne();
    const playerTwo = this.state.getPlayerTwo();
    if (this.state.getWarState() === "nowar") {
      const playerOneCard = playerOne.takeOneCard();
      if (playerOneCard.length === 0) {
        this.state.setWinner(playerTwo);
        return;
      } else {
        this.state.setBoard(playerOneCard);
      }
      const playerTwoCard = playerTwo.takeOneCard();
      if (playerTwoCard.length === 0) {
        this.state.setWinner(playerTwo);
        return;
      } else {
        this.state.setBoard(playerTwoCard);
      }
      this.calculateWinner(this.state.getBoard());
      this.state.setBoard([]);
    } else {
      let playerOneCards = playerOne.takeThreeCards();
      if (playerOneCards.length === 0) {
        this.state.setWinner(playerTwo);
      } else {
        this.state.setBoard(playerOneCards);
      }
      let playerTwoCards = playerTwo.takeThreeCards();
      if (playerTwoCards.length === 0) {
        this.state.setWinner(playerOne);
      } else {
        this.state.setBoard(playerTwoCards);
      }
      playerOneCards = playerOne.takeOneCard();
      if (playerOneCards.length === 0) {
        this.state.setWinner(playerTwo);
      } else {
        this.state.setBoard(playerOneCards);
      }
      playerTwoCards = playerTwo.takeOneCard();
      if (playerTwoCards.length === 0) {
        this.state.setWinner(playerOne);
      } else {
        this.state.setBoard(playerTwoCards);
      }
    }
    this.calculateWinner(this.state.getBoard());
  }
}

class Player {
  private faceDownDeck: string[];
  private faceUpDeck: string[];
  private name: string;
  public constructor(name: string, deck: string[]) {
    this.name = name;
    this.faceDownDeck = deck;
    this.faceUpDeck = [];
  }
  public getPlayerName(): string {
    return this.name;
  }
  public takeOneCard(): string[] {
    if (this.faceDownDeck.length === 0) {
      this.fromFaceUpDeckToFaceDownDeck();
    }
    if (this.faceDownDeck.length > 0) {
      return [this.faceDownDeck.pop()];
    } else {
      return [];
    }
  }
  public takeThreeCards(): string[] {
    if (this.faceDownDeck.length < 3) {
      this.fromFaceUpDeckToFaceDownDeck();
    }
    if (this.faceDownDeck.length < 3) {
      return [];
    }
    const cards = [];
    cards.push(this.faceDownDeck.pop());
    cards.push(this.faceDownDeck.pop());
    cards.push(this.faceDownDeck.pop());
    return cards;
  }

  public fromFaceUpDeckToFaceDownDeck(): void {
    this.shuffleCards(this.faceUpDeck);
    this.setFaceDownDeck(this.faceUpDeck);
    this.setFaceUpDeck([]);
  }

  public setFaceUpDeck(cards: string[]): void {
    this.faceUpDeck.push(...cards);
  }

  public getFaceUpDeck(): string[] {
    return this.faceUpDeck;
  }
  public setFaceDownDeck(cards: string[]): void {
    this.faceDownDeck.push(...cards);
  }

  public getfaceDownDeck(): string[] {
    return this.faceDownDeck;
  }

  public shuffleCards(deck: string[]): void {
    let currentIndex = deck.length,
      randomIndex;
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [deck[currentIndex], deck[randomIndex]] = [
        deck[randomIndex],
        deck[currentIndex],
      ];
    }
  }
}
class State {
  protected Game: Game;
  private playerOne: Player;
  private playerTwo: Player;
  private winner: undefined | Player;
  private board: string[];
  private warState: "war" | "nowar";
  public constructor(board: string[], playerOne: Player, playerTwo: Player) {
    this.board = board;
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.winner = undefined;
    this.warState = "nowar";
  }
  public setGame(Game: Game) {
    this.Game = Game;
  }

  public setBoard(board: string[]): void {
    this.board = board;
  }

  public getBoard(): string[] {
    return this.board;
  }
  public getWarState(): "war" | "nowar" {
    return this.warState;
  }

  public setWarState(warState: "war" | "nowar"): void {
    this.warState = warState;
  }

  public getPlayerOne(): Player {
    return this.playerOne;
  }
  public getPlayerTwo(): Player {
    return this.playerTwo;
  }
  public setWinner(winner: Player): void {
    this.winner = winner;
  }
  public getWinner(): Player {
    return this.winner;
  }
}

const playerOne = new Player("Akmal", ["kq"]);
const playerTwo = new Player("Anvarov", ["kq"]);

const game = new Game(new State([], playerOne, playerTwo));
while (game.getState().getWinner() === undefined) {
  game.play();
}
console.log(game.getState().getWinner().getPlayerName());
