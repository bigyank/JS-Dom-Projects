import {
  checkWin,
  isDraw,
  showTurn,
  resetGame,
  endGame,
  isGameRunning,
  updateMoves,
} from './game';

import { markCell, updateTurn } from './gameCell';

const statusContainer = document.querySelector('.status-action');
const gameGrid = document.querySelector('.game-grid');

const resetDiv = statusContainer.querySelector('.reset');
const gameCells = gameGrid.querySelectorAll('.game-cell');

let playerX = [];
let playerO = [];

function playGame(e) {
  if (!isGameRunning()) return;

  const cell = e.target;
  const { turn } = gameGrid.dataset;
  const { cellidentifer } = cell.dataset;

  // dont change if the grid is already taken
  if (cell.dataset.player) {
    return;
  }

  // mark the choosen cell in data-attribute
  cell.dataset.player = turn;

  // update turn, DOM and players moves
  updateTurn(turn);
  markCell(turn, cell);
  updateMoves(turn, cellidentifer, playerX, playerO);

  // check game status
  switch (true) {
    case checkWin(playerX):
      endGame('Player 1 wins');
      break;
    case checkWin(playerO):
      endGame('Player 2 wins');
      break;
    case isDraw(gameCells):
      endGame('Draw!');
      break;
    default:
      showTurn(turn);
  }
}

resetDiv.addEventListener('click', () => resetGame(playerX, playerO));

[...gameCells].map((cell) => cell.addEventListener('click', playGame));
