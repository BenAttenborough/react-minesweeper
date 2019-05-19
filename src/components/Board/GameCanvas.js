import React, { useState, useEffect } from "react";
import drawBoard from "./drawBoard";
import handleCanvasClick from "../../gameLogic";

export default function GameCanvas({ board, setBoard }) {
    function createCanvas(canvasRef) {
        const canvas = canvasRef.current;
        return canvas.getContext("2d");
    }

    const numCellsWide = board.length;
    const numCellsHigh = board[0].length;
    const width = 20;
    const fillColour = "lightgrey";
    const strokeColours = ["#000000", "#FFFFFF", "#FFFFFF", "#000000"];
    let canvasRef = React.useRef(null);

    const [clickCords, setClickCords] = useState(null);

    useEffect(() => {
        const canvas = createCanvas(canvasRef);
        drawBoard(canvas, board, width, fillColour, strokeColours, clickCords);
    });

    console.log("clickCords", clickCords);

    return (
        <div>
            <canvas
                ref={canvasRef}
                width={numCellsWide * width}
                height={numCellsHigh * width}
                className="board"
                onClick={event => {
                    handleCanvasClick(
                        event,
                        canvasRef,
                        width,
                        setClickCords,
                        board,
                        setBoard
                    );
                }}
            />
        </div>
    );
}
