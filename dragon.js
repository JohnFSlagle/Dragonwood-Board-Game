//Point system
//new monster after one is defeated
//simple animations
//different cards
//monster weaknesses



let player1Cards = 5;
let player2Cards = 5;
let currentPlayer = "player1";
let selectedMonster = "";
let monsters = {
  troll: { name: "Troll", hp: 10 },
  GreenFuzzball: { name: "Green Fuzzball", hp: 15 },
  dragon: { name: "Dragon", hp: 20 },
  PinkMeanie: { name: "Pink Meanie", hp: 25 },
  goblin: { name: "Goblin", hp: 12 },
};

function drawCard(player) {
  if (currentPlayer !== player) {
    document.getElementById("result").innerText = "It's not your turn.";
    return;
  }
  if (player === "player1") {
    player1Cards++;
    document.getElementById("player1-cards").innerText = player1Cards;
  } else {
    player2Cards++;
    document.getElementById("player2-cards").innerText = player2Cards;
  }
  switchTurn();
}

function attack(player) {
  if (currentPlayer !== player) {
    document.getElementById("result").innerText = "It's not your turn.";
    return;
  }
  const cards = player === "player1" ? player1Cards : player2Cards;
  if (cards === 0) {
    document.getElementById(
      "result"
    ).innerText = `${player} doesn't have any cards to attack!`;
  } else {
    if (!selectedMonster) {
      selectedMonster = prompt("Please select a monster to attack:");
      if (!selectedMonster || !monsters[selectedMonster]) {
        document.getElementById("result").innerText =
          "Invalid monster selection!";
        return;
      }
    }

    const cardsToUse = prompt(
      `How many cards do you want to use to attack the ${monsters[selectedMonster].name}? (You have ${cards} cards)`
    );
    if (cardsToUse === null) {
      return;
    }
    if (isNaN(cardsToUse)) {
      document.getElementById(
        "result"
      ).innerText = `Please enter a valid number of cards to use.`;
    } else if (cardsToUse < 1) {
      document.getElementById("result").innerText =
        "You do not have any cards.";
    } else if (cardsToUse > cards) {
      document.getElementById("result").innerText =
        "You don't have that many cards.";
    } else {
      const diceRoll = rollDice(cardsToUse);
      const monsterPower = monsters[selectedMonster].hp;

      document.getElementById(
        "result"
      ).innerText = `${player} rolled ${diceRoll}.`;
      if (diceRoll >= monsterPower) {
        document.getElementById(
          "result"
        ).innerText += `\n${player} defeated the ${monsters[selectedMonster].name}!`;
      } else {
        document.getElementById(
          "result"
        ).innerText += `\n${player} failed to defeat the ${monsters[selectedMonster].name}.`;
      }
      if (player === "player1") {
        player1Cards -= cardsToUse;
        document.getElementById("player1-cards").innerText = player1Cards;
      } else {
        player2Cards -= cardsToUse;
        document.getElementById("player2-cards").innerText = player2Cards;
      }
    }
    selectedMonster = "";
  }
  switchTurn();
}

function rollDice(numDice) {
  let total = 0;
  for (let i = 0; i < numDice; i++) {
    total += Math.floor(Math.random() * 6) + 1;
  }
  return total;
}

function switchTurn() {
  currentPlayer = currentPlayer === "player1" ? "player2" : "player1";
  document.getElementById(
    "turn-indicator"
  ).innerText = `It's ${currentPlayer}'s turn.`;
}


function chooseMonster(monsterName) {
  selectedMonster = monsterName;
  document.getElementById(
    "result"
  ).innerText = `${monsterName} selected for attack.`;
}


document.querySelectorAll(".monster").forEach((monster) => {
  monster.addEventListener("click", function () {
    selectedMonster(this.getAttribute("data-monster"));
  });
});

function updateCardCount(player, count) {
  const playerCardselement = document.getElementById(`${player}-cards`);
  if (playerCardselement) {
    playerCardselement.innerText = count;
  }
}
