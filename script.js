// Please implement exercise logic here
let playersTurn = 1; // matches with starting instructions
// const player1Cards = [];
// const player2Cards = [];
let player1Card;
let maxNumberOfCards;
let cardContainer;

// set timeout for dealing cards
let canClick = true;

const player1Button = document.createElement("button");

const player2Button = document.createElement("button");

const label = document.createElement("label");

const inputField = document.createElement("input");
const submitButton = document.createElement("button");

const gameInfo = document.createElement("div");

const linebreak = document.createElement("br");

// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Shuffle an array of cards
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    const randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cards;
};

const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ["hearts", "diamonds", "clubs", "spades"];
  const suitsSymbol = ["♥", "♦", "♣", "♠"];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];
    const currentSuitSymbol = suitsSymbol[suitIndex];
    let currentColour;

    if (currentSuit == "hearts" || currentSuit == "diamonds") {
      currentColour = "red";
    } else {
      currentColour = "black";
    }

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      let shortName = `${rankCounter}`;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === "1") {
        cardName = "ace";
        shortName = "A";
      } else if (cardName === "11") {
        cardName = "jack";
        shortName = "J";
      } else if (cardName === "12") {
        cardName = "queen";
        shortName = "Q";
      } else if (cardName === "13") {
        cardName = "king";
        shortName = "K";
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        suitSymbol: currentSuitSymbol,
        rank: rankCounter,
        displayName: shortName,
        colour: currentColour,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

const deck = shuffleCards(makeDeck());

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerText = message;
};

// const cardInfo = {
//   suitSymbol: "♦️",
//   suit: "diamond",
//   name: "queen",
//   displayName: "Q",
//   colour: "red",
//   rank: 12,
// };

const createCard = (cardInfo) => {
  const suit = document.createElement("div");
  suit.classList.add("suit");
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement("div");
  name.classList.add(cardInfo.displayName, cardInfo.colour);
  name.innerText = cardInfo.displayName;

  const card = document.createElement("div");
  card.classList.add("card");

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

// const createCard = (card) => {
//   const cardEl = document.createElement("p");
//   cardEl.innerText = card.name; // also output the other attributes
//   return cardEl;
// };

// click functions w/o timeout

// const player1Click = () => {
//   if (playersTurn === 1) {
//     // Pop player 1's card metadata from the deck
//     player1Card = deck.pop();

//     // Create card element from card metadata
//     const cardElement = createCard(player1Card);
//     // Empty cardContainer in case this is not the 1st round of gameplay
//     cardContainer.innerHTML = "";
//     // Append the card element to the card container
//     cardContainer.appendChild(cardElement);

//     // Switch to player 2's turn
//     playersTurn = 2;
//   }
// };

// const player2Click = () => {
//   if (playersTurn === 2) {
//     // Pop player 2's card metadata from the deck
//     const player2Card = deck.pop();

//     // Create card element from card metadata
//     const cardElement = createCard(player2Card);
//     // Append card element to card container
//     cardContainer.appendChild(cardElement);

//     // Switch to player 1's turn
//     playersTurn = 1;

//     // Determine and output winner
//     if (player1Card.rank > player2Card.rank) {
//       output("player 1 wins");
//     } else if (player1Card.rank < player2Card.rank) {
//       output("player 2 wins");
//     } else {
//       output("tie");
//     }
//   }
// };

const player1Click = () => {
  if (playersTurn === 1 && canClick === true) {
    canClick = false;

    setTimeout(() => {
      player1Card = deck.pop();

      const cardElement = createCard(player1Card);

      // in case this is not the 1st time
      // in the entire app,
      // empty the card container
      cardContainer.innerHTML = "";

      cardContainer.appendChild(cardElement);
      playersTurn = 2;
      canClick = true;
    }, 2000);
  }
};

const player2Click = () => {
  if (playersTurn === 2 && canClick === true) {
    canClick = false;

    setTimeout(() => {
      const player2Card = deck.pop();
      const cardElement = createCard(player2Card);

      cardContainer.appendChild(cardElement);

      playersTurn = 1;
      canClick = true;

      if (player1Card.rank > player2Card.rank) {
        output("player 1 wins");
      } else if (player1Card.rank < player2Card.rank) {
        output("player 2 wins");
      } else {
        output("tie");
      }
    }, 2000);
  }
};

const submitNumberOfCards = (input) => {
  maxNumberOfCards = input;
};

const initGame = () => {
  // initialize button functionality
  player1Button.innerText = "Player 1 Draw";
  document.body.appendChild(player1Button);

  player2Button.innerText = "Player 2 Draw";
  document.body.appendChild(player2Button);

  player1Button.addEventListener("click", player1Click);
  player2Button.addEventListener("click", player2Click);

  // fill game info div with starting instructions
  gameInfo.innerText = "Its player 1 turn. Click to draw a card!";
  document.body.appendChild(gameInfo);

  cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");
  document.body.appendChild(cardContainer);
};

// const startPage = () => {
//   if (maxNumberOfCards === null || maxNumberOfCards === undefined) {
//     const newForm = document.createElement("form");

//     label.innerText = "Input max no. of cards allowed per player:";
//     label.appendChild(linebreak);

//     inputField.id = "maxCards";
//     inputField.type = "number";
//     // inputField.placeholder = "Input max no. of cards";
//     inputField.required = true;
//     // document.body.appendChild(inputField);

//     submitButton.type = "submit";
//     submitButton.innerText = "Submit";
//     // document.body.appendChild(submitButton);

//     newForm.appendChild(label);
//     newForm.appendChild(inputField);
//     newForm.appendChild(submitButton);
//     document.body.appendChild(newForm);

//     // submitButton.addEventListener("click", submitNumberOfCards);
//   } else {
//     initGame();
//   }
// };

// console.log(maxNumberOfCards);
// startPage();
initGame();
