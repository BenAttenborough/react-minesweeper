import createCell from "./DrawCell";
// import createHex from "./DrawHex";

export default function drawBoard(
    type,
    canvas,
    board,
    width,
    fillColour,
    strokeColours,
    revealedStrokeColours,
    clickCords
) {
    console.log("board", board);
    console.log("board[0][0]", board[0][0].shape);
    board.map((row, rowPos) => {
        return row.map((item, colPos) => {
            console.log("item", item);
            let alternateOffset = 0;
            if (type === "HEX") {
                alternateOffset = rowPos % 2 ? width / 2 : 0;
            }
            createCell(
                type,
                canvas,
                width,
                width * colPos + alternateOffset,
                width * rowPos,
                fillColour,
                item.revealed ? revealedStrokeColours : strokeColours,
                item
            );
        });
    });
}
