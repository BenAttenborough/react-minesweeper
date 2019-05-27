import createSquare from "./DrawSquare";

export default function drawBoard(
    canvas,
    board,
    width,
    fillColour,
    strokeColours,
    revealedStrokeColours,
    clickCords
) {
    // console.log("board", board);
    board.map((row, rowPos) => {
        return row.map((item, colPos) => {
            // console.log("item", item);
            createSquare(
                canvas,
                width,
                width * colPos,
                width * rowPos,
                fillColour,
                item.revealed ? revealedStrokeColours : strokeColours,
                clickCords,
                item
            );
        });
    });
}
