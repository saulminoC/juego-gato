// gato.js

// Variables globales
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');
const statusText = document.getElementById('status');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;
let winsX = 0;
let winsO = 0;

// Combinaciones ganadoras
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Manejar clics en las celdas
function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-index');

    if (board[cellIndex] !== '' || !isGameActive) return;

    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');

    if (checkWinner()) {
        highlightWinningCells();
        statusText.textContent = `¡El jugador ${currentPlayer} ganó!`;
        isGameActive = false;
        updateScore();
        return;
    }

    if (board.every(cell => cell !== '')) {
        statusText.textContent = '¡Empate!';
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Turno del jugador ${currentPlayer}`;
}

// Comprobar si hay un ganador
function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
}

// Resaltar celdas ganadoras
function highlightWinningCells() {
    const winningCombination = winningCombinations.find(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });

    winningCombination.forEach(index => {
        cells[index].classList.add('winning');
    });
}

// Actualizar marcador
function updateScore() {
    if (currentPlayer === 'X') {
        winsX++;
        scoreX.textContent = winsX;
    } else {
        winsO++;
        scoreO.textContent = winsO;
    }
}

// Reiniciar juego
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken', 'winning');
    });
    currentPlayer = 'X';
    isGameActive = true;
    statusText.textContent = `Turno del jugador ${currentPlayer}`;
}

// Añadir eventos
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

// Estado inicial
statusText.textContent = `Turno del jugador ${currentPlayer}`;
