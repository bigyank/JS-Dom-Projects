const humanCards = document.querySelectorAll(".human-choices img");
const resultDOM = document.querySelector(".result");
const roundsDOM = document.querySelector(".rounds");
const humanScoreDOM = document.querySelector(".human-score");
const cpuScoreDOM = document.querySelector(".cpu-score");
const cpuCards = document.querySelectorAll(".cpu-choices img");
const overlay = document.getElementById("overlay");

overlay.addEventListener("click", function () {
  this.style.display = "none";
  rounds = 1;
  humanScore = 0;
  cpuScore = 0;
  setStats("1", "CHOOSE A CARD", "0", "0");
});

const winConditions = ["rock scissors", "paper rock", "scissors paper"];

let rounds = 1;
let humanScore = 0;
let cpuScore = 0;

function setCPUChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randNum = Math.floor(Math.random() * 3);

  [...cpuCards].map((img) => {
    if (img.className === choices[randNum]) {
      img.classList.add("selected");
    }
    img.addEventListener("transitionend", () => {
      img.classList.remove("selected");
    });
  });

  return choices[randNum];
}

function updateScore(scoreToUpdate) {
  rounds++;
  roundsDOM.textContent = rounds;
  if (scoreToUpdate === "human") {
    humanScore++;
    humanScoreDOM.textContent = humanScore;
  } else {
    cpuScore++;
    cpuScoreDOM.textContent = cpuScore;
  }
}

function checkGameState() {
  if (rounds > 5) {
    if (humanScore > cpuScore) {
      overlay.firstElementChild.textContent = "HUMAN WINS";
    } else {
      overlay.firstElementChild.textContent = "CPU WINS";
    }
    setTimeout(() => {
      overlay.style.display = "block";
    }, 400);
  }
}

function setStats(round, winner, cpuScore, humanScore) {
  resultDOM.textContent = round;
  roundsDOM.textContent = winner;
  cpuScoreDOM.textContent = cpuScore;
  humanScoreDOM.textContent = humanScore;
}

function playGame() {
  [...humanCards].map((img) => {
    img.addEventListener("click", checkResult);
  });

  function checkResult(e) {
    const humanChoice = e.target.className;
    const cpuChoice = setCPUChoice();
    switch (true) {
      case humanChoice === cpuChoice:
        resultDOM.textContent = "draw";
        break;
      case winConditions.includes(`${humanChoice} ${cpuChoice}`):
        updateScore("human");
        resultDOM.textContent = "human wins";
        break;
      default:
        updateScore("cpu");
        resultDOM.textContent = "cpu wins";
    }

    checkGameState();
  }
}

playGame();
