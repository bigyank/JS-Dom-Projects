const statusContainer = document.querySelector('.status-action');
const gameGrid = document.querySelector('.game-grid');

const statusDiv = statusContainer.querySelector('.status');
const gameCells = gameGrid.querySelectorAll('.game-cell');

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let isRunning = true;

const xChar = '×';
const oChar = '○';

export function checkWin(player) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return player.includes(index);
    });
  });
}

export function isDraw() {
  return [...gameCells].every((cell) => {
    return cell.dataset.player;
  });
}

export function showTurn(turn) {
  statusDiv.textContent = `${turn === xChar ? 'o is next' : 'x is next'}`;
}

export function resetGame(playerX, playerO) {
  [...gameCells].map((cell) => {
    cell.innerHTML = '';
    cell.removeAttribute('data-player');
    gameGrid.dataset.turn = xChar;
    showTurn(oChar, xChar);
    playerX.length = 0;
    playerO.length = 0;
    // playerX = [];
    // playerO = [];
    isRunning = true;
  });
}

export function endGame(message) {
  statusDiv.textContent = message;
  isRunning = false;
}

export function isGameRunning() {
  return isRunning;
}

// export function updateMoves(turn, cellidentifer, playerX, playerO) {
//   turn === xChar
//     ? (playerX = [...playerX, parseInt(cellidentifer, 10)])
//     : (playerO = [...playerO, parseInt(cellidentifer, 10)]);
// }

export function updateMoves(turn, cellidentifer, playerX, playerO) {
  turn === xChar
    ? playerX.push(parseInt(cellidentifer, 10))
    : playerO.push(parseInt(cellidentifer, 10));
}
