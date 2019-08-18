import { createBoard } from "./CreateBoard";

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
                cell.adjCells.forEach(cell => {
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

const updateGrid = (data, cell, setBoard, numBombs) => {
    // console.log("Adjacent cells:", cell.adjCells);
    // console.log("data:", data);

    // const numRevealed = data.map(row => {
    // 	return row.map(cell => {
    // 		return
    // 	})
    // })
    // const mockReveal = [
    //     {
    //         col: 1,
    //         row: 0
    //     }
    // ];
    // const cellsToReveal = cell.adjCells;
    // const dataCopy = data.map((x, xIdx) => {
    //     return x.map((y, yIdx) => {
    //         if (
    //             cellsToReveal.some(
    //                 cell => cell.col === yIdx && cell.row === xIdx
    //             )
    //         ) {
    //             return Object.assign({}, { ...y, revealed: true });
    //         } else {
    //             return Object.assign({}, y);
    //         }
    //     });
    // });
    // setBoard(dataCopy);

    // console.log("data", data);
    // console.log("cell", cell);
    if (cell.bomb) {
        handleBomb(data, setBoard);
    } else {
        handleNonBomb(data, cell, setBoard, numBombs);
    }
};

function handleNonBomb(data, cell, setBoard, numBombs) {
    // console.log("cellCheck", cellCheck(data, cell.row, cell.col));
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
    // let numRevealed = 0;
    // dataCopy.forEach(row => {
    //     row.forEach(cell => {
    //         if (cell.revealed) {
    //             numRevealed++;
    //         }
    //     });
    // });
    // console.log("Num revealed:", numRevealed);
    // console.log("Cells to reveal:", numBombs - numRevealed);
    setBoard(dataCopy);
}

/**
 * Reveal all cells if bomb clicked
 *
 * @param {*} data
 * @param {*} setBoard
 */
function handleBomb(data, setBoard) {
    let dataCopy = data.map(x => {
        return x.map(y => {
            return Object.assign({}, { ...y, revealed: true });
        });
    });
    setBoard(dataCopy);
}

function toggleFlag(cell, data, toggle) {
    // console.log("Toggling flag");
    // console.log("cell >>", cell);

    const dataCopy = data.map((x, xIdx) => {
        return x.map((y, yIdx) => {
            // console.log("cell.row", cell.row);
            // console.log("xIdx", xIdx);
            // console.log("cell.col", cell.col);
            // console.log("yIdx", yIdx);
            if (cell.row === xIdx && cell.col === yIdx) {
                // console.log("MATCH >>>");
                return Object.assign({}, { ...y, flag: toggle });
            } else {
                return Object.assign({}, y);
            }
        });
    });
    // console.log("dataCopy", dataCopy);
    return dataCopy;
}

function setFlag(data, cell, setBoard) {
    // console.log("data", data);
    // console.log("cell", cell);
    if (!cell.revealed) {
        setBoard(toggleFlag(cell, data, !cell.flag));
    }
}

export function handleCanvasClick(
    event,
    clickType,
    canvasRef,
    cellWidth,
    board,
    setBoard,
    setGameRunning,
    gameOptions
) {
    // console.log("Handling canvas click", event);
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
            // console.log("cell hit >>>>>>>>>>", cell);
            if (isInPath) {
                // console.log("In path:", cell);
                // updateBoard
                if (clickType === "LEFT" && !cell.flag) {
                    updateGrid(board, cell, setBoard, gameOptions.numBombs);
                }
                if (clickType === "RIGHT") {
                    // console.log("Right click");
                    setFlag(board, cell, setBoard);
                }
            }
        });
    });
}

export function resetBoard(gameOptions, setBoard) {
    const newBoard = createBoard(
        gameOptions.width,
        gameOptions.height,
        gameOptions.numBombs,
        gameOptions.gameType
    );
    setBoard(newBoard);
}
