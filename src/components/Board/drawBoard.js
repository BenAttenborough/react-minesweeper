import createSquare from "./DrawSquare";

export default function drawBoard(
    canvas,
    board,
    width,
    fillColour,
    strokeColours,
    clickCords
) {
    // console.log("board", board);
    board.map((row, rowPos) => {
        return row.map((item, colPos) => {
            createSquare(
                canvas,
                width,
                width * colPos,
                width * rowPos,
                fillColour,
                strokeColours,
                clickCords,
                item
            );
        });
    });
}
