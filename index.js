const board = document.getElementById('board');
const status = document.getElementById('status');
let currentPlayer = 'X';
let cells = Array(9).fill(null);

function createBoard() {
  board.innerHTML = '';
  cells = Array(9).fill(null);
  cells.forEach((_, i) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
  });
}

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (!cells[index]) {
    cells[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    if (checkWin()) {
      status.textContent = `Player ${currentPlayer} wins!`;
      disableBoard();
    } else if (cells.every(cell => cell)) {
      status.textContent = 'It\'s a draw!';
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      status.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}

function disableBoard() {
  document.querySelectorAll('.cell').forEach(cell => cell.removeEventListener('click', handleCellClick));
}

function resetGame() {
  currentPlayer = 'X';
  status.textContent = "Player X's turn";
  createBoard();
}

createBoard();