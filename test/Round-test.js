const chai = require('chai');
const should = chai.should();

const Card = require('../src/Card');
const Deck = require('../src/Deck');
const Turn = require('../src/Turn');
const Round = require('../src/Round');

describe('Round', function() {

  it('should be a function', function() {
    (Round).should.be.a('function');
  })

  it('should create an instance of Round', function() {
    const round = new Round();
    (round).should.be.an.instanceOf(Round); 
  })

  it('should contain a deck object', function() {
    const deck = new Deck([{
      "id": 3,
      "question": "What type of prototype method directly modifies the existing array?",
      "answerChoices": ["mutator method", "accessor method", "iteration method"],
      "correctAnswer": "mutator method"
    }, {
      "id": 4,
      "question": "What type of prototype method does not modify the existing array but returns a particular representation of the array?",
      "answerChoices": ["mutator method", "accessor method", "iteration method"],
      "correctAnswer": "accessor method"
    }, {
      "id": 5,
      "question": "What type of prototype method loops through the existing array and applies a callback function that may mutate each element and return a new value?",
      "answerChoices": ["mutator method", "accessor method", "iteration method"],
      "correctAnswer": "iteration method"
    }]);
    const round = new Round(deck);
    (round.deck).should.deep.equal(deck);
  })

  it('should list the current card', function() {
    const cards = [
      new Card(3, "What type of prototype method directly modifies the existing array?", ["mutator method", "accessor method", "iteration method"], "mutator method"),
      new Card(4, "What type of prototype method does not modify the existing array but returns a particular representation of the array?", ["mutator method", "accessor method", "iteration method"], "accessor method"),
      new Card(5, "What type of prototype method loops through the existing array and applies a callback function that may mutate each element and return a new value?", ["mutator method", "accessor method", "iteration method"], "iteration method")
    ];
    const deck = new Deck(cards);
    const round = new Round(deck);
    (round.deck.cardArray[0]).should.deep.equal({
      "id": 3,
      "question": "What type of prototype method directly modifies the existing array?",
      "answerChoices": ["mutator method", "accessor method", "iteration method"],
      "correctAnswer": "mutator method"
    });
  })

  it('should list the number of turns as 0 by default', function() {
    const round = new Round();
    (round.turns).should.equal(0);
  })

  it('should have an empty array of incorrect guesses by default', function() {
    const round = new Round();
    (round.incorrectGuesses).should.deep.equal([]);
  })
  
  it('should be able to return the current card', function() {
    const cards = [
      new Card(3, "What type of prototype method directly modifies the existing array?", ["mutator method", "accessor method", "iteration method"], "mutator method"),
      new Card(4, "What type of prototype method does not modify the existing array but returns a particular representation of the array?", ["mutator method", "accessor method", "iteration method"], "accessor method"),
      new Card(5, "What type of prototype method loops through the existing array and applies a callback function that may mutate each element and return a new value?", ["mutator method", "accessor method", "iteration method"], "iteration method")
    ];
    const deck = new Deck(cards);
    const round = new Round(deck);
    const currentCard = round.returnCurrentCard();
    (currentCard).should.deep.equal({
      "id": 3,
      "question": "What type of prototype method directly modifies the existing array?",
      "answerChoices": ["mutator method", "accessor method", "iteration method"],
      "correctAnswer": "mutator method"
    })
  })

  it('should be able to calculate the percentage of questions answered correctly', function() {
    const cards = [
      new Card(3, "What type of prototype method directly modifies the existing array?", ["mutator method", "accessor method", "iteration method"], "mutator method"),
      new Card(4, "What type of prototype method does not modify the existing array but returns a particular representation of the array?", ["mutator method", "accessor method", "iteration method"], "accessor method"),
      new Card(5, "What type of prototype method loops through the existing array and applies a callback function that may mutate each element and return a new value?", ["mutator method", "accessor method", "iteration method"], "iteration method")
    ];
    const deck = new Deck(cards);
    const round = new Round(deck);
    const guess = round.takeTurn('mutator method');
    const guess2 = round.takeTurn('mutator method');
    const percentCorrect = round.calculatePercentCorrect();
    (percentCorrect).should.equal(50);
  })

  it('should return the percent correct on end of round', function() {
    const deck = new Deck([{
      "id": 3,
      "question": "What type of prototype method directly modifies the existing array?",
      "answerChoices": ["mutator method", "accessor method", "iteration method"],
      "correctAnswer": "mutator method"
    }]);
    const round = new Round(deck);
    const guess = round.takeTurn('mutator method');
    const endMessage = round.endRound();
    (endMessage).should.equal(`** Round Over! ** You answered 100% of the questions correctly!`);
  })
})

describe('Round - Taking a Turn', function() {

  it('should only accept answers in the form of strings', function() {
    const cards = [
      new Card(3, "What type of prototype method directly modifies the existing array?", ["mutator method", "accessor method", "iteration method"], "mutator method"),
      new Card(4, "What type of prototype method does not modify the existing array but returns a particular representation of the array?", ["mutator method", "accessor method", "iteration method"], "accessor method"),
      new Card(5, "What type of prototype method loops through the existing array and applies a callback function that may mutate each element and return a new value?", ["mutator method", "accessor method", "iteration method"], "iteration method")
    ];
    const deck = new Deck(cards);
    const round = new Round(deck);
    const guess = round.takeTurn(7);
    const guess2 = round.takeTurn(false);
    (guess).should.equal('Answer must be in form of a string');
    (guess2).should.equal('Answer must be in form of a string');
  })

  it('should be able to increase the turn count', function() {
    const cards = [
      new Card(3, "What type of prototype method directly modifies the existing array?", ["mutator method", "accessor method", "iteration method"], "mutator method"),
      new Card(4, "What type of prototype method does not modify the existing array but returns a particular representation of the array?", ["mutator method", "accessor method", "iteration method"], "accessor method"),
      new Card(5, "What type of prototype method loops through the existing array and applies a callback function that may mutate each element and return a new value?", ["mutator method", "accessor method", "iteration method"], "iteration method")
    ];
    const deck = new Deck(cards);
    const round = new Round(deck);
    round.takeTurn('mutator method');
    (round.turns).should.equal(1);
  })

  it('should evaluate whether a guess is correct or incorrect', function() {
        const cards = [
      new Card(3, "What type of prototype method directly modifies the existing array?", ["mutator method", "accessor method", "iteration method"], "mutator method"),
      new Card(4, "What type of prototype method does not modify the existing array but returns a particular representation of the array?", ["mutator method", "accessor method", "iteration method"], "accessor method"),
      new Card(5, "What type of prototype method loops through the existing array and applies a callback function that may mutate each element and return a new value?", ["mutator method", "accessor method", "iteration method"], "iteration method")
    ];
    const deck = new Deck(cards);
    const round = new Round(deck);
    const guess = round.takeTurn('mutator method');
    const guess2 = round.takeTurn('mutator method');
    (guess).should.equal('correct!');
    (guess2).should.equal('incorrect!');
  })

  it('should remove the current card from the deck', function() {
        const cards = [
      new Card(3, "What type of prototype method directly modifies the existing array?", ["mutator method", "accessor method", "iteration method"], "mutator method"),
      new Card(4, "What type of prototype method does not modify the existing array but returns a particular representation of the array?", ["mutator method", "accessor method", "iteration method"], "accessor method"),
      new Card(5, "What type of prototype method loops through the existing array and applies a callback function that may mutate each element and return a new value?", ["mutator method", "accessor method", "iteration method"], "iteration method")
    ];
    const deck = new Deck(cards);
    const round = new Round(deck);
    round.takeTurn('mutator method');
    const currentCard = round.returnCurrentCard();
    (currentCard).should.deep.equal({
      "id": 4,
      "question": "What type of prototype method does not modify the existing array but returns a particular representation of the array?",
      "answerChoices": ["mutator method", "accessor method", "iteration method"],
      "correctAnswer": "accessor method"
    })
  })

  it('should save the id of the incorrect card', function() {
        const cards = [
      new Card(3, "What type of prototype method directly modifies the existing array?", ["mutator method", "accessor method", "iteration method"], "mutator method"),
      new Card(4, "What type of prototype method does not modify the existing array but returns a particular representation of the array?", ["mutator method", "accessor method", "iteration method"], "accessor method"),
      new Card(5, "What type of prototype method loops through the existing array and applies a callback function that may mutate each element and return a new value?", ["mutator method", "accessor method", "iteration method"], "iteration method")
    ];
    const deck = new Deck(cards);
    const round = new Round(deck);
    const guess = round.takeTurn('iteration method');
    (guess).should.equal('incorrect!');
    (round.incorrectGuesses).should.deep.equal([3]);
  })

})