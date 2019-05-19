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
const inBounds = (x, y, width, height) => {
    if (x < 0 || y < 0) {
        return null;
    }
    if (x > width - 1 || y > height - 1) {
        return null;
    }
    return { x, y };
};

/**
 * Returns all the cells adjacent to the cells at the provided co-ordinates.
 * Depends on the {type} of grid
 *
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @param {String} type
 */
const getAdjCells = (x, y, width, height, type) => {
    console.log("type >>", type);
    let adjCells = [
        inBounds(x - 1, y - 1, width, height),
        inBounds(x, y - 1, width, height),
        inBounds(x + 1, y - 1, width, height),
        inBounds(x - 1, y, width, height),
        inBounds(x + 1, y, width, height),
        inBounds(x - 1, y + 1, width, height),
        inBounds(x, y + 1, width, height),
        inBounds(x + 1, y + 1, width, height)
    ];
    if (type === "HEX") {
        if (y % 2 === 0) {
            adjCells = [
                inBounds(x, y - 1, width, height),
                inBounds(x + 1, y - 1, width, height),
                inBounds(x - 1, y, width, height),
                inBounds(x + 1, y, width, height),
                inBounds(x, y + 1, width, height),
                inBounds(x + 1, y + 1, width, height)
            ];
        } else {
            adjCells = [
                inBounds(x - 1, y - 1, width, height),
                inBounds(x, y - 1, width, height),
                inBounds(x - 1, y, width, height),
                inBounds(x + 1, y, width, height),
                inBounds(x - 1, y + 1, width, height),
                inBounds(x, y + 1, width, height)
            ];
        }
    }
    return adjCells.filter(cell => cell !== null);
};

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
export default function createBoard(width, height, numBombs, type) {
    console.log("type", type);
    let cells = [];
    let row = [];
    let numCells = width * height;
    let nums = [];
    let bombPositions = [];

    for (let i = 0; i < numCells; i++) {
        nums.push(i);
    }

    for (let i = 0; i < numBombs; i++) {
        const randomIdx = getRandomInt(nums.length);
        bombPositions.push(nums.splice(randomIdx, 1)[0]);
    }

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const cellNum = x + y + x * (width - 1);
            row.push({
                revealed: false,
                bomb: bombPositions.includes(cellNum),
                cellNum,
                flag: false,
                x,
                y,
                shape: new Path2D()
            });
        }
        cells.push(row);
        row = [];
    }
    // console.log("cells", cells);
    // console.log("cells[0]", cells[0]);
    // console.log("cells[0][0]", cells[0][0]);
    // console.log("cells[0][1]", cells[0][1]);
    // console.log("cells[1][0]", cells[1][0]);
    for (let x = 0; x < height; x++) {
        for (let y = 0; y < width; y++) {
            const adjCells = getAdjCells(x, y, width, height, type);
            let count = 0;
            adjCells.forEach(cell => {
                // console.log("CELL >>", cell);
                if (cells[cell.x][cell.y].bomb) {
                    count++;
                }
            });
            cells[y][x].count = count;
        }
    }
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
