// interface IPlayer {
// 	name: string,
// 	cards: string[]
// 	makeMove(): void,
// 	shuffle(): void
// }

class Player {
	name: string;
	cards: string[];
	takeOneCard = (): string[] => {
		return ['test']
	}
	takeThreeCards = (): string[]=> {
		return ['test']
	}
	constructor(name: string){
		this.name = name
	}

}