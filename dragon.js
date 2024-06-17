//new monster after one is defeated
//simple animations
//different cards
//monster weaknesses

let player1Cards = 5;
let player2Cards = 5;
let player1points = 0;
let player2points = 0;

let currentPlayer = "player1";
let selectedMonster = "";
let monsters = {
  troll: { name: "Troll", hp: 10, points: 10 },
  GreenFuzzball: { name: "GreenFuzzball", hp: 15, points: 15 },
  dragon: { name: "Dragon", hp: 25, points: 25 },
  PinkMeanie: { name: "PinkMeanie", hp: 20, points: 20 },
  goblin: { name: "Goblin", hp: 5, points: 5 },
};

function showInstructions() {
  alert(
    `Welcome to Dragonwood. A game of dice and daring. Player 1 goes first. When playing a card, a dice is rolled from 1 to 6 that will attack the monster. Once the card is used it is gone and you will use a turn to draw another. The more cards the stronger your attack. The stronger the monster the more points. Who will win?`
  );
}
window.onload = function () {
  showInstructions();
  document.getElementById(
    "turn-indicator"
  ).innerText = `It's ${currentPlayer}'s turn.`;
};

function updatePoints(player, points) {
  if (player === "player1") {
    player1points += points;
    updatePointsDisplay("1", player1points);
  } else {
    player2points += points;
    updatePointsDisplay("2", player2points);
  }
}

function updatePointsDisplay(player, points) {
  document.getElementById(`player${player}-points`).innerText = points;
}

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
    return;
  }

  if (!selectedMonster) {
    selectedMonster = prompt(
      "Please select a monster to attack (e.g., troll, GreenFuzzball, dragon, PinkMeanie, goblin):"
    ).toLowerCase();
    if (!selectedMonster || !monsters[selectedMonster]) {
      document.getElementById("result").innerText =
        "Invalid monster selection!";
      selectedMonster = "";
      return;
    }
  }

  const cardsToUse = parseInt(
    prompt(
      `How many cards do you want to use to attack the ${monsters[selectedMonster].name}? (You have ${cards} cards)`
    ),
    10
  );

  if (isNaN(cardsToUse) || cardsToUse < 1 || cardsToUse > cards) {
    document.getElementById("result").innerText = "Invalid number of cards.";
    return;
  }

  const diceRoll = rollDice(cardsToUse);
  const monsterPower = monsters[selectedMonster].hp;

  document.getElementById("result").innerText = `${player} rolled ${diceRoll}.`;

  if (diceRoll >= monsterPower) {
    document.getElementById(
      "result"
    ).innerText += `\n${player} defeated the ${monsters[selectedMonster].name}!`;
    updatePoints(player, monsters[selectedMonster].points);
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

  selectedMonster = "";
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
  if (!monsters[monsterName]) {
    document.getElementById("result").innerText = "Invalid monster selection!";
    return;
  }
  selectedMonster = monsterName;
  document.getElementById(
    "result"
  ).innerText = `${monsterName} selected for attack.`;
}

document.querySelectorAll(".monster").forEach((monster) => {
  monster.addEventListener("click", function () {
    chooseMonster(this.getAttribute("data-monster"));
  });
});
