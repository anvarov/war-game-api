import { cardValues as deck, deckSecondHalf, deckFirstHalf } from './Deck'
const cardValues = { ...deck }

class Game {
	private state: State;
	constructor(state: State) {
		this.state = state;
	}

	public setState(state: State): void {
		this.state = state;
	}

	public getState(): State {
		return this.state;
	}

	public calculateNextMove(board: string[]): void {
		if (cardValues[board[board.length - 1]] > cardValues[board[board.length - 2]]) {

			this.state.setWarState("nowar");
			this.state.getPlayer('playerTwo').setDeck(board, 'faceUpDeck');
			this.state.setBoard([])
		} else if (cardValues[board[board.length - 1]] < cardValues[board[board.length - 2]]) {
			this.state.setWarState("nowar");
			this.state.getPlayer('playerOne').setDeck(board, 'faceUpDeck');
			this.state.setBoard([])
		} else {
			this.state.setWarState("war");
		}
	}
	public play(): void {
		const makeMove = (playerOne: Player, playerTwo: Player, cardsToTake: 3 | 1) => {
			if (playerOne.getDeck('faceDownDeck').length < cardsToTake) {
				playerOne.fromFaceUpDeckToFaceDownDeck()
			}
			const playerOneCard = cardsToTake === 1 ? playerOne.takeOneCard() : playerOne.takeThreeCards();
			if (playerOneCard.length === 0) {
				playerTwo.setDeck(this.state.getBoard(), 'faceUpDeck')
				this.state.setBoard([])
				this.state.setWinner(playerTwo);
				return;
			} else {
				this.state.setBoard(playerOneCard);
			}
			if (playerTwo.getDeck('faceDownDeck').length < cardsToTake) {
				playerTwo.fromFaceUpDeckToFaceDownDeck()
			}
			const playerTwoCard = cardsToTake === 1 ? playerOne.takeOneCard() : playerOne.takeThreeCards()
			if (playerTwoCard.length === 0) {
				playerOne.setDeck(this.state.getBoard(), 'faceUpDeck')
				this.state.setBoard([])
				this.state.setWinner(playerOne);
				return;
			} else {
				this.state.setBoard(playerTwoCard);
			}
		}
		const playerOne = this.state.getPlayer('playerOne');
		const playerTwo = this.state.getPlayer('playerTwo');
		switch (this.state.getWarState()) {
			case 'nowar':
				// if (playerOne.getDeck('faceDownDeck').length === 0 ) {
				// 	playerOne.fromFaceUpDeckToFaceDownDeck()
				// } 
				makeMove(playerOne, playerTwo, 1)
				this.calculateNextMove(this.state.getBoard())
				break;
			case 'war':
				// if (playerOne.faceDownDeck.length < 3) {
				// 	this.fromFaceUpDeckToFaceDownDeck();
				// }
				makeMove(playerOne, playerTwo, 3)
				makeMove(playerOne, playerTwo, 1)
				this.calculateNextMove(this.state.getBoard())
				break;
			default:
				break;
		}
	}
}

class Player {
	private faceDownDeck: string[];
	private faceUpDeck: string[];
	private name: string;
	public constructor(name: string, deck: string[]) {
		this.name = name;
		this.faceDownDeck = this.shuffleCards(deck);
		this.faceUpDeck = [];
	}
	public getPlayerName(): string {
		return this.name;
	}
	public takeOneCard(): string[] {
		// if (this.faceDownDeck.length === 0) {
		// 	this.fromFaceUpDeckToFaceDownDeck();
		// }
		if (this.faceDownDeck.length > 0) {
			return [this.faceDownDeck.pop()];
		} else {
			return [];
		}
	}
	public takeThreeCards(): string[] {
		// if (this.faceDownDeck.length < 3) {
		// 	this.fromFaceUpDeckToFaceDownDeck();
		// }
		if (this.faceDownDeck.length < 3) {
			return [];
		}
		const cards = []
		cards.push(this.faceDownDeck.pop())
		cards.push(this.faceDownDeck.pop())
		cards.push(this.faceDownDeck.pop())
		return cards;
	}

	public fromFaceUpDeckToFaceDownDeck(): void {
		const shuffledDeck = this.shuffleCards(this.faceUpDeck);
		this.setDeck(shuffledDeck, 'faceDownDeck')
		this.setDeck([], 'faceUpDeck')
		// this.setFaceDownDeck(this.faceUpDeck);
		// this.setFaceUpDeck([]);
	}

	// public setFaceUpDeck(cards: string[]): void {
	// 	this.faceUpDeck = [...this.faceUpDeck,...cards];
	// }

	// public getFaceUpDeck(): string[] {
	// 	return this.faceUpDeck;
	// }
	public setDeck(cards: string[], type: 'faceDownDeck' | 'faceUpDeck'): void {
		if (cards.length === 0) {
			this[type] = []
			return
		}

		this[type] = [...this[type], ...cards]
	}
	public getDeck(type: 'faceDownDeck' | 'faceUpDeck'): string[] {
		return this[type]
	}
	// public getfaceDownDeck(): string[] {
	// 	return this.faceDownDeck;
	// }

	public shuffleCards(deck: string[]): string[] {
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
		return deck
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
	// public setContext(Game: Game) {
	// 	this.Game = Game;
	// }

	public setBoard(board: string[]): void {
		if (board.length === 0) {
			this.board = []
			return
		}
		this.board = [...this.board, ...board];
	}
	public getBoard(): string[] {
		console.log(this.board, 'current board')
		return this.board;
	}
	public getWarState(): "war" | "nowar" {
		console.log('game state ', this.warState)
		return this.warState;
	}

	public setWarState(warState: "war" | "nowar"): void {
		this.warState = warState;
	}

	public getPlayer(player: 'playerOne' | 'playerTwo'): Player {
		return this[player];
	}
	// public getPlayerTwo(): Player {
	// 	return this.playerTwo;
	// }
	public setWinner(winner: Player): void {
		this.winner = winner;
	}
	public getWinner(): Player {
		return this.winner;
	}
}

const playerOne = new Player("Akmal", [...deckFirstHalf]);
const playerTwo = new Player("Anvarov", [...deckSecondHalf])

const game = new Game(new State([], playerOne, playerTwo));
do {
	game.play();

} while (game.getState().getWinner() === undefined)
console.log(game.getState().getWinner().getPlayerName());
console.log(game.getState().getWinner().getDeck('faceDownDeck'), 'facedowndeck')
