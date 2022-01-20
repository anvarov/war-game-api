const generateDeck = (): Record<string, number> => {
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

const deckArray = Array.from(Object.keys(generateDeck()))
const cardValues = generateDeck()
const deckFirstHalf = deckArray.splice(0, 26)
const deckSecondHalf = deckArray

export {cardValues, deckFirstHalf, deckSecondHalf}