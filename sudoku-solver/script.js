const grid = document.getElementById("grid");

let cells = [];

// Create 9x9 Sudoku Grid
for (let i = 0; i < 81; i++) {

    const input = document.createElement("input");

    input.type = "number";

    input.min = 1;

    input.max = 9;

    grid.appendChild(input);

    cells.push(input);
}

// Get board values
function getBoard() {

    let board = [];

    for (let row = 0; row < 9; row++) {

        let currentRow = [];

        for (let col = 0; col < 9; col++) {

            const value = cells[row * 9 + col].value;

            currentRow.push(value ? parseInt(value) : 0);
        }

        board.push(currentRow);
    }

    return board;
}

// Display solved board
function displayBoard(board) {

    for (let row = 0; row < 9; row++) {

        for (let col = 0; col < 9; col++) {

            cells[row * 9 + col].value = board[row][col];
        }
    }
}

// Check if valid
function isValid(board, row, col, num) {

    for (let x = 0; x < 9; x++) {

        if (board[row][x] === num ||
            board[x][col] === num) {

            return false;
        }
    }

    const startRow = row - row % 3;

    const startCol = col - col % 3;

    for (let i = 0; i < 3; i++) {

        for (let j = 0; j < 3; j++) {

            if (board[i + startRow][j + startCol] === num) {

                return false;
            }
        }
    }

    return true;
}

// Sudoku Solver using Backtracking
function solve(board) {

    for (let row = 0; row < 9; row++) {

        for (let col = 0; col < 9; col++) {

            if (board[row][col] === 0) {

                for (let num = 1; num <= 9; num++) {

                    if (isValid(board, row, col, num)) {

                        board[row][col] = num;

                        if (solve(board)) {

                            return true;
                        }

                        board[row][col] = 0;
                    }
                }

                return false;
            }
        }
    }

    return true;
}

function solveSudoku() {

    let board = getBoard();

    if (solve(board)) {

        displayBoard(board);

        alert("Sudoku Solved!");

    } else {

        alert("No Solution ESxists!");
    }
}