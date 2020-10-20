const gameGrid = document.querySelector('.game-grid');

const xChar = '×';
const oChar = '○';

export function markCell(turn, cell) {
  const spanElement = document.createElement('span');
  turn === xChar
    ? (spanElement.className = 'playerx')
    : (spanElement.className = 'playery');
  spanElement.textContent = turn;
  cell.appendChild(spanElement);
}

export function updateTurn(turn) {
  turn === xChar
    ? (gameGrid.dataset.turn = oChar)
    : (gameGrid.dataset.turn = xChar);
}
