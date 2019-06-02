/**
 * Checks if provided co-ordinates are in the bounds of provided grid.
 * Grid bounds represented by {width} and {height}
 * Returns null if co-ords are outside grid
 * or an object containing the co-ords if in bounds
 *
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 */
export function inBounds(row, col, width, height) {
    if (row < 0 || col < 0) {
        return null;
    }
    if (row > height - 1 || col > width - 1) {
        return null;
    }
    return { row, col };
}

/**
 * Returns all the cells adjacent to the cells at the provided co-ordinates.
 * Depends on the {type} of grid
 *
 * @param {Number} row
 * @param {Number} col
 * @param {Number} width
 * @param {Number} height
 * @param {String} type
 */
export function getAdjCells(row, col, width, height, type) {
    // console.log("type >>", type);
    // console.log(`row ${row} col ${col}`);
    let adjCells = [
        inBounds(row - 1, col - 1, width, height),
        inBounds(row, col - 1, width, height),
        inBounds(row + 1, col - 1, width, height),
        inBounds(row - 1, col, width, height),
        inBounds(row + 1, col, width, height),
        inBounds(row - 1, col + 1, width, height),
        inBounds(row, col + 1, width, height),
        inBounds(row + 1, col + 1, width, height)
    ];
    return adjCells.filter(cell => cell !== null);
}

/**
 * Returns a random int between 0 and provided int
 *
 * @param {Number} max
 * @return {Number}
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

/**
 * Returns arry of numbers
 *
 * @param {Number} start
 * @param {Number} end
 */
export function getNumbersArray(start, end) {
    if (start > end) {
        return [];
    }
    if (start === end) {
        return [start];
    }
    const numbers = [];
    for (start; start <= end; start++) {
        numbers.push(start);
    }
    return numbers;
}

export function getUniqueRandomNumbers(start, end, number) {
    const numbersArray = getNumbersArray(start, end);
    if (numbersArray.length === 0) {
        console.warn("No numbers available to choose from");
        return numbersArray;
    }
    if (numbersArray.length <= number) {
        console.warn(
            "You have requested more random numbers than number available"
        );
        // Return all numbers
        return numbersArray;
    }
    const randomNumbers = [];
    for (let i = 0; i < number; i++) {
        const randomIdx = getRandomInt(numbersArray.length);
        randomNumbers.push(numbersArray.splice(randomIdx, 1)[0]);
    }
    return randomNumbers;
}

// Needs test
function createCells(width, height, bombPositions) {
    let cells = [];
    let rowContainer = [];
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const cellNum = row + col + row * (width - 1);
            const adjCells = getAdjCells(row, col, width, height);
            rowContainer.push({
                revealed: false,
                bomb: bombPositions.includes(cellNum),
                cellNum,
                flag: false,
                row,
                col,
                adjCells,
                shape: new Path2D()
            });
        }
        cells.push(rowContainer);
        rowContainer = [];
    }
    return cells;
}

function countBombsInAdjCells(cellsToCheck, board) {
    let count = 0;
    cellsToCheck.forEach(cell => {
        const cellToCheck = board[cell.row][cell.col];
        // console.log(`board[${cell.row}][${cell.col}]`, cellToCheck);
        if (cellToCheck.bomb) {
            count++;
        }
    });
    return count;
}

function appendCountToCells(cells, type) {
    const height = cells.length;
    const width = cells[0].length;
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const adjCells = getAdjCells(row, col, width, height, type);
            cells[row][col].count = countBombsInAdjCells(adjCells, cells);
        }
    }
    return cells;
}

/**
 * Returns a two dimensional array of objects depending on specified params
 *
 * Shape of each object is:
 * bomb: {bool - whether there is a bomb in the cell or not}
 * cellNum: {int - a unique cell number}
 * count: {int - number of bombs adjacent to cell}
 * flag: {bool - whether the cell has been flagged}
 * revealed: {bool - whether the cell has been revealed}
 * x: {int - x co-ordinate}
 * y: {int - y co-ordinate}
 *
 * @param {Number} width
 * @param {Number} height
 * @param {Number} numBombs
 * @param {String} type
 */
export function createBoard(width, height, numBombs, type) {
    console.log("type", type);
    let numCells = width * height;
    let bombPositions = getUniqueRandomNumbers(0, numCells, numBombs);
    let cells = createCells(width, height, bombPositions);
    cells = appendCountToCells(cells, type);
    return cells;
}

// function cellCheck(data, x, y) {
//     let revealedCells = [];
//     let cell = data[x][y];
//     if (cell.count === 0) {
//         if (!revealedCells.some(cell => cell.x === x && cell.y === y)) {
//             revealedCells.push({ x, y });
//             getAdjCells(x, y).forEach(cell => {
//                 checker(cell.x, cell.y);
//             });
//         }
//     } else {
//         revealedCells.push({ x, y });
//     }
//     return revealedCells;
// }

// const updateGrid = (data, x, y) => {
//     // e.preventDefault()
//     // console.log("click type", e.type)
//     // if (!gameRunning) {
//     // 	setGameState(true);
//     // }
//     const cell = data[x][y];
//     if (cell.bomb) {
//         console.log("BANGG!");
//         const dataCopy = data.map(x => {
//             return x.map(y => {
//                 return Object.assign({}, y);
//             });
//         });
//         dataCopy[x][y] = Object.assign(
//             {},
//             { ...dataCopy[x][y], revealed: true }
//         );
//         setData(dataCopy);
//         setGameState(false);
//     } else {
//         console.log(`cellCheck(${x},${y})`);
//         console.log(cellCheck(x, y));
//         const cellsToReveal = cellCheck(x, y);
//         const dataCopy = data.map((x, xIdx) => {
//             return x.map((y, yIdx) => {
//                 if (
//                     cellsToReveal.some(
//                         cell => cell.y === yIdx && cell.x === xIdx
//                     )
//                 ) {
//                     return Object.assign({}, { ...y, revealed: true });
//                 } else {
//                     return Object.assign({}, y);
//                 }
//             });
//         });
//         setData(dataCopy);
//     }
// };

// const handleRightClick = event => {
//     event.preventDefault();
//     console.log("Right clicked pressed!");

//     const { x, y } = getCursorPosition(canvasRef.current, event);
//     // console.log("x:", x);
//     // console.log("y:", y);
//     var rect = canvasRef.current.getBoundingClientRect();
//     var rawX = event.clientX - rect.left;
//     var rawY = event.clientY - rect.top;

//     setClickCords({ x: rawX, y: rawY, clickType: "RIGHT" });
// };

// const resetGame = () => {
//     const cells = createBoard();
//     setData(cells, setGameState(true));
// };

// const getNumRevealed = data => {
//     let numRevealed = 0;

//     data.forEach(item => {
//         numRevealed = item.reduce((curr, next) => {
//             if (next.revealed) {
//                 return curr + 1;
//             }
//             return curr;
//         }, numRevealed);
//     });
//     return numRevealed;
// };

// const getNumFlags = data => {
//     let numFlags = 0;

//     data.forEach(item => {
//         numFlags = item.reduce((curr, next) => {
//             if (next.flag) {
//                 return curr + 1;
//             }
//             return curr;
//         }, numFlags);
//     });
//     return numFlags;
// };
