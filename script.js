const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('reset');
const pvpBtn = document.getElementById('pvp');
const pvcBtn = document.getElementById('pvc');

let board = Array(9).fill('');
let currentPlayer = 'X';
let gameActive = true;
let vsComputer = false;

const winningCombos = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

// --- Start Game ---
function startGame(computerMode = false){
  board.fill('');
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = 'X';
  gameActive = true;
  vsComputer = computerMode;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

// --- Handle cell click ---
function handleClick(index){
  if (!gameActive || board[index] !== '') return;

  board[index] = currentPlayer;
  cells[index].textContent = currentPlayer;

  if (checkWinner()){
    statusText.textContent = vsComputer && currentPlayer==='O' ? `Computer wins! ` : `Player ${currentPlayer} wins! `;
    gameActive = false;
    return;
  }

  if (board.every(c => c !== '')){
    statusText.textContent = `It's a draw! `;
    gameActive = false;
    return;
  }

  // Switch turns
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = vsComputer && currentPlayer==='O' ? `Computer's turn...` : `Player ${currentPlayer}'s turn`;

  // Computer move
  if (vsComputer && currentPlayer === 'O'){
    setTimeout(computerMove, 400);
  }
}

// --- Computer move ---
function computerMove(){
  const available = board.map((val, idx) => val === '' ? idx : null).filter(v => v !== null);
  const randomIndex = available[Math.floor(Math.random()*available.length)];
  handleClick(randomIndex);
}

// --- Check winner ---
function checkWinner(){
  return winningCombos.some(combo => {
    const [a,b,c] = combo;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

// --- Reset ---
function resetGame(){
  startGame(vsComputer);
}

// --- Event listeners ---
cells.forEach((cell, idx) => {
  cell.addEventListener('click', () => handleClick(idx));
});

pvpBtn.addEventListener('click', () => startGame(false));
pvcBtn.addEventListener('click', () => startGame(true));
resetBtn.addEventListener('click', resetGame);

// --- Auto-start PvP mode ---
startGame(false);
