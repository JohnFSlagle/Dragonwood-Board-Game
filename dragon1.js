// Having issues with correct monsters
let player1Cards = 5;
let player2Cards = 5;
let player1Points = 0;
let player2Points = 0;
let currentPlayer = "player1";
let monsters = {
  troll: { name: "Troll", hp: 10, points: 10 },
  greenFuzzball: { name: "Green Fuzzball", hp: 15, points: 15 },
  dragon: { name: "Dragon", hp: 20, points: 20 },
  pinkMeanie: { name: "Pink Meanie", hp: 25, points: 25 },
  goblin: { name: "Goblin", hp: 12, points: 12 },
};

function updatePlayerInfo(player) {
  const playerCardsElement = document.getElementById(`${player}-cards`);
  const playerPointsElement = document.getElementById(`${player}-points`);
  if (playerCardsElement && playerPointsElement) {
    if (player === "player1") {
      playerCardsElement.innerText = player1Cards;
      playerPointsElement.innerText = player1Points;
    } else {
      playerCardsElement.innerText = player2Cards;
      playerPointsElement.innerText = player2Points;
    }
  }
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
  const formattedMonsterName = monsterName.toLowerCase().replace(/\s/g, "");

  const monster = monsters[formattedMonsterName];
  if (monster) {
    const cardsToUse = prompt(
      `How many cards do you want to use to attack the ${
        monster.name
      }? (You have ${
        currentPlayer === "player1" ? player1Cards : player2Cards
      } cards)`
    );
    if (cardsToUse === null) {
      return;
    }
    attack(currentPlayer, monster, cardsToUse);
  } else {
    document.getElementById("result").innerText = "Invalid monster selection!";
  }
}

function attack(player, monster, cardsToUse) {
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

  const diceRoll = rollDice(cardsToUse);

  document.getElementById("result").innerText = `${player} rolled ${diceRoll}.`;
  if (diceRoll >= monster.hp) {
    document.getElementById(
      "result"
    ).innerText += `\n${player} defeated the ${monster.name} and gained ${monster.points} points!`;
    if (player === "player1") {
      player1Points += monster.points;
    } else {
      player2Points += monster.points;
    }
    removeMonster(monster.name);
  } else {
    document.getElementById(
      "result"
    ).innerText += `\n${player} failed to defeat the ${monster.name}.`;
  }

  if (player === "player1") {
    player1Cards -= cardsToUse;
  } else {
    player2Cards -= cardsToUse;
  }

  updatePlayerInfo(player);
  switchTurn();
}

// Not working
function removeMonster(monsterName) {
  const monsterElement = document.querySelector(
    `[data-monster="${monsterName}"]`
  );
  if (monsterElement) {
    monsterElement.classList.add("defeated");
    setTimeout(() => {
      monsterElement.remove();
    }, 1000);
  }
}

function drawCard(player) {
  if (currentPlayer !== player) {
    document.getElementById("result").innerText = "It's not your turn.";
    return;
  }

  if (player === "player1") {
    player1Cards++;
  } else {
    player2Cards++;
  }

  updatePlayerInfo(player);
  switchTurn();
}

updatePlayerInfo("player1");
updatePlayerInfo("player2");
document.getElementById(
  "turn-indicator"
).innerText = `It's ${currentPlayer}'s turn.`;

document.querySelectorAll(".monster").forEach((monster) => {
  monster.addEventListener("click", function () {
    chooseMonster(this.getAttribute("data-monster"));
  });
});
