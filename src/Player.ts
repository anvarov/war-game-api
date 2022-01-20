class Player {
	name: string;
	cards: string[];
	takeOneCard = (deck: string[]): string[] => {
		return [...deck.pop()]
	}
	takeThreeCards = (deck: string[]): string[]=> {
		return ['test']
	}
	constructor(name: string){
		this.name = name
	}
}

export default Player