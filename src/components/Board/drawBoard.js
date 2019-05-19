import createSquare from "./DrawSquare";

export default function drawBoard(
    canvas,
    board,
    width,
    fillColour,
    strokeColours,
    clickCords
) {
    board.map((rows, x) => {
        return rows.map((item, y) => {
            createSquare(
                canvas,
                width,
                width * x,
                width * y,
                fillColour,
                strokeColours,
                clickCords,
                item
            );
        });
    });
}
