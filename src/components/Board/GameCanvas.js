import React, { useEffect } from "react";
import drawBoard from "./drawBoard";
import { handleCanvasClick } from "../../gameLogic";

export default function GameCanvas({ board, setBoard, setGameRunning }) {
    console.log("GameCanvas board", board);
    function createCanvas(canvasRef) {
        const canvas = canvasRef.current;
        return canvas.getContext("2d");
    }
    const numCellsWide = board[0].length;
    const numCellsHigh = board.length;
    const width = 20;
    const fillColour = "lightgrey";
    const strokeColours = ["#FFFFFF", "#000000", "#000000", "#FFFFFF"];
    const revealedStrokeColours = ["#000000", "#FFFFFF", "#FFFFFF", "#000000"];
    let canvasRef = React.useRef(null);

    useEffect(() => {
        const canvas = createCanvas(canvasRef);
        drawBoard(
            canvas,
            board,
            width,
            fillColour,
            strokeColours,
            revealedStrokeColours
        );
    });

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
                        "LEFT",
                        canvasRef,
                        width,
                        board,
                        setBoard,
                        setGameRunning
                    );
                }}
                onContextMenu={event => {
                    handleCanvasClick(
                        event,
                        "RIGHT",
                        canvasRef,
                        width,
                        board,
                        setBoard
                    );
                }}
            />
        </div>
    );
}
