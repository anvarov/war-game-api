var generateCards = function () {
    var suites = ['D', 'C', 'H', 'S'];
    var ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    var makeDeck = function () {
        var deck = {};
        for (var i = 0; i < ranks.length; i++) {
            for (var j = 0; j < suites.length; j++) {
                deck[ranks[i] + suites[j]] = i;
            }
        }
        return deck;
    };
    var deck = makeDeck();
    console.log(deck, Object.keys(deck).length);
};
generateCards();
