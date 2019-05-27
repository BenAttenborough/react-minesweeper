// function getCursorPosition(canvas, event, cellWidth) {
//     var rect = canvas.getBoundingClientRect();
//     var x = event.clientX - rect.left;
//     var y = event.clientY - rect.top;
//     // console.log("x: " + x + " y: " + y);
//     // console.log("x:", Math.floor(x / cellWidth));
//     // console.log("y:", Math.floor(y / cellWidth));
//     return { x: Math.floor(x / cellWidth), y: Math.floor(y / cellWidth) };
// }

// const inBounds = (row, col, width, height) => {
//     // console.log("width", width);
//     // console.log("height", height);
//     if (row < 0 || col < 0) {
//         return null;
//     }
//     if (row > height - 1 || col > width - 1) {
//         return null;
//     }
//     return { row, col };
// };

// /**
//  * Returns all the cells adjacent to the cells at the provided co-ordinates.
//  * Depends on the {type} of grid
//  *
//  * @param {Number} row
//  * @param {Number} col
//  * @param {Number} width
//  * @param {Number} height
//  * @param {String} type
//  */
// const getAdjCells = (row, col, width, height, type) => {
//     // console.log("type >>", type);
//     // console.log(`row ${row} col ${col}`);
//     let adjCells = [
//         inBounds(row - 1, col - 1, width, height),
//         inBounds(row, col - 1, width, height),
//         inBounds(row + 1, col - 1, width, height),
//         inBounds(row - 1, col, width, height),
//         inBounds(row + 1, col, width, height),
//         inBounds(row - 1, col + 1, width, height),
//         inBounds(row, col + 1, width, height),
//         inBounds(row + 1, col + 1, width, height)
//     ];
//     return adjCells.filter(cell => cell !== null);
// };

function cellCheck(board, row, col) {
    const revealedCells = [];
    function checker(row, col) {
        const cell = board[row][col];
        if (cell.count === 0) {
            if (
                !revealedCells.some(
                    cell => cell.row === row && cell.col === col
                )
            ) {
                revealedCells.push({ row, col });
                getAdjCells(row, col).forEach(cell => {
                    checker(cell.row, cell.col);
                });
            }
        } else {
            revealedCells.push({ row, col });
        }
    }
    checker(row, col);
    return revealedCells;
}

const updateGrid = (data, cell, setBoard) => {
    console.log("data", data);
    console.log("cell", cell);
    if (cell.bomb) {
        console.log("BANGG!");
        const dataCopy = data.map(x => {
            return x.map(y => {
                return Object.assign({}, y);
            });
        });
        dataCopy[cell.row][cell.col] = Object.assign(
            {},
            { ...dataCopy[cell.row][cell.col], revealed: true }
        );
        console.log("dataCopy", dataCopy);
        setBoard(dataCopy);
        // setBoard({});
        // setData(dataCopy);
        // setGameState(false);
    } else {
        // console.log(`Cell ${cell.x} ${cell.y} would be revealed`);
        console.log("cellCheck", cellCheck(data, cell.row, cell.col));
        // console.log(`cellCheck(${x},${y})`);
        // console.log(cellCheck(x, y));
        const cellsToReveal = cellCheck(data, cell.row, cell.col);
        const dataCopy = data.map((x, xIdx) => {
            return x.map((y, yIdx) => {
                if (
                    cellsToReveal.some(
                        cell => cell.col === yIdx && cell.row === xIdx
                    )
                ) {
                    return Object.assign({}, { ...y, revealed: true });
                } else {
                    return Object.assign({}, y);
                }
            });
        });
        setBoard(dataCopy);
        // const cellsToReveal = cellCheck(x, y);
        // const dataCopy = data.map((row, rowPos) => {
        //     return row.map((item, colPos) => {
        //         if (
        //             cellsToReveal.some(
        //                 cell => cell.y === yIdx && cell.x === xIdx
        //             )
        //         ) {
        //             return Object.assign({}, { ...y, revealed: true });
        //         } else {
        //             return Object.assign({}, y);
        //         }
        //     });
        // });
        // console.log("dataCopy", dataCopy);
        // setBoard(dataCopy);
    }
};

export default function handleCanvasClick(
    event,
    canvasRef,
    cellWidth,
    setClickCords,
    board,
    setBoard
) {
    console.log("Handling canvas click", event);
    event.preventDefault();
    var rect = canvasRef.current.getBoundingClientRect();
    var rawX = event.clientX - rect.left;
    var rawY = event.clientY - rect.top;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    board.forEach(x => {
        x.forEach(cell => {
            const isInPath = ctx.isPointInPath(cell.shape, rawX, rawY);
            // console.log("CALLED");
            if (isInPath) {
                // console.log("In path:", cell);
                // updateBoard
                updateGrid(board, cell, setBoard);
            }
        });
    });

    console.log("rawX:", rawX);
    console.log("rawY:", rawY);
    // setClickCords({ x: rawX, y: rawY, clickType: "LEFT" });
}
