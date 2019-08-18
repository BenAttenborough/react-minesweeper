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
    // console.log("gameOptions>>>>>>>>>>>>>>>", gameOptions);
    const { gameType } = gameOptions;
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
}
