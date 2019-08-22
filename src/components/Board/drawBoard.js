import createCell from "./DrawCell";
// import createHex from "./DrawHex";

export default function drawBoard(
    gameOptions,
    canvas,
    board,
    width,
    fillColour,
    fillColourRevealed,
    strokeColours,
    revealedStrokeColours,
    clickCords
) {
    // console.log("board", board);
    // console.log("board[0][0]", board[0][0].shape);
    console.log("gameOptions>>>>>>>>>>>>>>>", gameOptions);
    const { gameType } = gameOptions;
    const boardWidth = width * board[0].length;
    console.log("boardWidth", boardWidth);
    board.forEach((row, rowPos) => {
        return row.forEach((item, colPos) => {
            // console.log("item", item);
            let alternateOffset = 0;
            if (gameType === "HEX") {
                alternateOffset = rowPos % 2 ? width / 2 : 0;
            }
            createCell(
                gameType,
                canvas,
                width,
                width * colPos + alternateOffset,
                width * rowPos,
                item.revealed ? fillColourRevealed : fillColour,
                item.revealed ? revealedStrokeColours : strokeColours,
                item
            );
        });
    });
    if (gameOptions.gameWon === 1) {
        drawEndGameBox(canvas, boardWidth, width, "You're a Winner!");
    }
    if (gameOptions.gameWon === 2) {
        drawEndGameBox(canvas, boardWidth, width, "Game over!");
    }
}

function drawEndGameBox(ctx, boardWidth, cellWidth, message) {
    ctx.fillStyle = "lightgrey";
    ctx.font = "2rem Bangers";
    ctx.fillRect(cellWidth, cellWidth, boardWidth - cellWidth * 2, 60);
    ctx.fillStyle = "red";
    ctx.fillText(message, cellWidth * 2, cellWidth * 3);
}
