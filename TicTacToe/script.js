const X_CLASS = 'x';
const O_CLASS = 'o';

const WINNING_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let xTurn;
const cellElements = document.querySelectorAll('[data-cell');
const board = document.getElementById('board');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');

const placeMark = (cell, currentClass) => {
    cell.classList.add(currentClass);
}

const switchTurn = () => {
    xTurn = !xTurn;
}

const setBoardHoverClass =() => {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if(xTurn) {
        board.classList.add(X_CLASS);
    } else {
        board.classList.add(O_CLASS);
    }
}

const startGame = () => {
    xTurn = true;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true })
    });
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
}

const handleClick = (event) => {
    const cell = event.target;
    const currentClass = xTurn ? X_CLASS : O_CLASS;
    placeMark(cell, currentClass);
    if(checkWin(currentClass)) {
        endGame(false);
    } else if(isDraw()) {
        endGame(true);
    } else {
        switchTurn();
        setBoardHoverClass();
    }
}

function checkWin(currentClass) {
    return WINNING_COMBOS.some(combo => {
        return combo.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function endGame(draw) {
    if(draw) {
        winningMessageTextElement.innerText = "Match Draw";
    } else {
        winningMessageTextElement.innerText = `${xTurn ? "X's" : "O's"} Wins`;
    }
    winningMessageElement.classList.add('show');
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    })
}

startGame();

restartButton.addEventListener('click', startGame);