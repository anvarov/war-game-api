// interface IGame {
// 	player1: Player,
// 	player2: Player,
// 	play(): void,
// 	generateDeck(): Record<string, number>,
// 	shuffleDeck(deck: Array<string>): Array<string>
// 	calculateWinner(): void
// }

import shuffle from "./utils";

class Game {
	cardRanks: Record<string, number>;
	deck: Array<string>;
	board: Array<string>
	// history: Array<Record<string, number>>;
	gameStatus: "war" | "nowar";
	player1: Player;
	player2: Player;
	shuffleDeck = shuffle
	calculateWinner(): void {
			
	}
	generateDeck = (): Record<string, number> => {
		const suites = ['D', 'C', 'H', 'S']
		const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
		const deck: Record<string, number> = {}
		for (let i = 0; i < ranks.length; i++) {
			for (let j = 0; j < suites.length; j++) {
				deck[ranks[i] + suites[j]] = i
			}
		}
		return deck
	}
	play(): void {
		this.player1.cards = this.deck.slice(0, 27)
		this.player2.cards = this.deck
		while (this.player1.cards.length === 52 || this.player2.cards.length === 52) {
			if (this.gameStatus === 'nowar') {
				this.board.push(...this.player1.takeOneCard())
				this.board.push(...this.player2.takeOneCard())
				this.calculateWinner()
			}
			if (this.gameStatus === 'war') {
				this.board.push(this.player1.takeThreeCards())
				this.board.push(this.player2.takeThreeCards())
				this.calculateWinner()
			}
			this.shuffleDeck(this.deck)
		}
	}
	constructor(player1: Player, player2: Player) {
		this.player1 = player1
		this.player2 = player2
		this.deck = this.shuffleDeck(Array.from(Object.keys(this.generateDeck())))
		this.cardRanks = this.generateDeck()
		this.board = []
			// this.history = []
	}
}

export default Game
// class Game {
// 	play(){
// 		player1.cards = deck.slice(0,27)
// 		player2.cards = deck
// 		while (player1.cards.length === 52 || player2.cards.length === 52) {
// 			if (gameStatus === 'nowar'){
// 				player1.takeOneCard()
// 				player2.takeOneCard()
// 				calculateWinner(player1, player2)
// 			}
// 			if (gameStatus === 'war'){
// 				player1.takeThreeCards()
// 				player2.takeThreeCards()
// 				calculateWinner(player1, player2)
// 			}
// 			shuffleDeck()
// 		}
// 	}
// }