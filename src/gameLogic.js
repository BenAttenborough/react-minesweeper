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

const updateGrid = (data, cell, setBoard) => {
    console.log("data", data);
    console.log("cell", cell);
    if (cell.bomb) {
        handleBomb(data, cell, setBoard);
    } else {
        handleNonBomb(data, cell, setBoard);
    }
};

function handleNonBomb(data, cell, setBoard) {
    console.log("cellCheck", cellCheck(data, cell.row, cell.col));
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
}

function handleBomb(data, cell, setBoard) {
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
}

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
