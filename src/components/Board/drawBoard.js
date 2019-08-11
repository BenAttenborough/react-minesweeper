import createSquare from "./DrawSquare";
import createHex from "./DrawHex";

export default function drawBoard(
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
    // board.map((row, rowPos) => {
    //     return row.map((item, colPos) => {
    //         console.log("item", item);
    //         createSquare(
    //             canvas,
    //             width,
    //             width * colPos,
    //             width * rowPos,
    //             fillColour,
    //             item.revealed ? revealedStrokeColours : strokeColours,
    //             item
    //         );
    //     });
    // });

    board.map((row, rowPos) => {
        return row.map((item, colPos) => {
            console.log("item", item);
            let alternateOffset = rowPos % 2 ? width / 2 : 0;
            createHex(
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

    // createHex(
    //     canvas,
    //     width,
    //     width * 0,
    //     width * 0,
    //     fillColour,
    //     strokeColours,
    //     board[0][0]
    // );
    // createHex(
    //     canvas,
    //     width,
    //     width * 1,
    //     width * 0,
    //     fillColour,
    //     strokeColours,
    //     board[1][0]
    // );
    // createHex(
    //     canvas,
    //     width,
    //     width * 2,
    //     width * 0,
    //     fillColour,
    //     strokeColours,
    //     board[2][0]
    // );
    // createHex(
    //     canvas,
    //     width,
    //     width * 0,
    //     width * 1,
    //     fillColour,
    //     strokeColours,
    //     board[0][1]
    // );
    // createHex(
    //     canvas,
    //     width,
    //     width * 0,
    //     width * 2,
    //     fillColour,
    //     strokeColours,
    //     board[0][2]
    // );
}
