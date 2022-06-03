// This is creating and naming the 4 suits 
const SUITS = ["club", "diamond", "heart", "spade"]
const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
const cardValueMap = {
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  'J': 11,
  'Q': 12,
  'K': 13,
  'A': 14
}


// Classes for Players 

class Player {
    constructor (name) {
        this.name = name;
        this.points = 0;
        this.playerHand = [];
    }
    describe () {
        return `${this.name} Played Card.`;  
    }
    addNewDeck(deck) {
        this.playerHand = deck;
      }    
}
class Card {
    constructor (suit, value) {
        this.suit = suit;
        this.value = value;
    }
}
class Deck {
    constructor(cards = newDeck()) {
        this.cards = cards;
    } shuffleDeck() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            let x = Math.floor(Math.random() * this.cards.length);
            let y = this.cards[x];
            this.cards[x] = this.cards[i];
            this.cards[i] = y;
        }
    }
    
}


function newDeck() {
    //using a flat map makes a nice and neat array rather than just map that will give you 4 seperate arrays 
    // Creates a deck of 52 cards - This deck is unshuffled
    // flatMap is creating 4 arrays organized by suits
    return SUITS.flatMap(suit => {
      return VALUES.map(value => {
        return new Card(suit, value);
      });
    });
  }

function gameSetup(player1, player2) {
    const deck = new Deck();
    deck.shuffleDeck();
}
function dishCards(player1, player2) {
    let deck = new Deck();
    deck.shuffleDeck();
    player1.addNewDeck(deck.cards.slice(0,25));
    player2.addNewDeck(deck.cards.slice(26, 51));
}
function playHand(player1, player2, roundNum) {
    console.log(`${player1.name} plays: ${player1.playerHand[roundNum].value} of ${player1.playerHand[roundNum].suit}
    `);
    
    console.log(`${player2.name} plays: ${player2.playerHand[roundNum].value} of ${player2.playerHand[roundNum].suit}
    `);
    
}

function playRoundResults(player1, player2) {
    
    for (let i = 0; i < player1.playerHand.length; i++) {
        playHand(player1, player2, i);
      if (cardValueMap[player1.playerHand[i].value] > cardValueMap[player2.playerHand[i].value]) {
        player1.points += 1;
        console.log(`${player1.name} has won this round`);
      } else if (cardValueMap[player1.playerHand[i].value] < cardValueMap[player2.playerHand[i].value]) {
        player2.points += 1;
        console.log(`${player2.name} has won this round`);
      } else {
        console.log("This is a tie, no points rewarded");
      }
    }
  }

  function finalTally(player1, player2) {
    if (player1.points > player2.points) {
      console.log(`${player1.name} has won this round with a final score of: ${player1.points}`);
    } else if (player1.points < player2.points) {
      console.log(`${player2.name} has won this round with a final score of: ${player2.points}`);
    } else {
      console.log(`${player1.name} and ${player2.name} are tied, no points given!`);
    }
  } 
  
  let James = new Player("James");
  let Morgan = new Player("Morgan");
  
  
  gameSetup(James, Morgan);

  dishCards(James, Morgan);
  
  playRoundResults(James, Morgan);
  
  finalTally(James, Morgan);
