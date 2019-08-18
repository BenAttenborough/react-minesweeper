import React, { useState, useEffect } from "react";
import { createBoard } from "../../CreateBoard";
import drawBoard from "./drawBoard";
import { handleCanvasClick } from "../../gameLogic";
import InGameUI from "../InGameUI/InGameUI";

// export default function GameCanvas({ board, setBoard, setGameRunning }) {
export default function GameCanvas({
    setGameRunning,
    gameOptions,
    setGameOptions
}) {
    // console.log("gameOptions>", gameOptions);
    // console.log("setGameOptions", setGameOptions);
    let { gameType } = gameOptions;
    let canvasWidthOffset = 0;
    let canvasHeightOffset = 0;
    switch (gameType) {
        case "HEX":
            canvasWidthOffset += gameOptions.width / 2;
            canvasHeightOffset += gameOptions.height / 3;
            break;
        default:
            canvasWidthOffset = 0;
            canvasHeightOffset = 0;
    }

    const gameBoard = createBoard(
        gameOptions.width,
        gameOptions.height,
        gameOptions.numBombs,
        gameOptions.gameType
    );
    const [board, setBoard] = useState(gameBoard);

    // console.log("GameCanvas board", board);
    function createCanvas(canvasRef) {
        const canvas = canvasRef.current;
        return canvas.getContext("2d");
    }
    const numCellsWide = board[0].length;
    const numCellsHigh = board.length;
    const width = 20;
    const fillColour = "darkgray";
    const fillColourRevealed = "lightgray";
    const strokeColours = ["#FFFFFF", "#000000", "#000000", "#FFFFFF"];
    const revealedStrokeColours = ["#000000", "#FFFFFF", "#FFFFFF", "#000000"];
    let canvasRef = React.useRef(null);

    const numCells = gameOptions.width * gameOptions.height;
    let numRevealed = 0;
    board.forEach(row => {
        row.forEach(cell => {
            if (cell.revealed) {
                numRevealed++;
            }
        });
    });
    let cellsToReveal = numCells - gameOptions.numBombs - numRevealed;
    if (cellsToReveal < 1) {
        cellsToReveal = 0;
    }
    console.log(">>>>numRevealed>>>>", numRevealed);
    console.log("Cells to reveal:", cellsToReveal);

    useEffect(() => {
        const canvas = createCanvas(canvasRef);
        drawBoard(
            gameOptions,
            canvas,
            board,
            width,
            fillColour,
            fillColourRevealed,
            strokeColours,
            revealedStrokeColours
        );
    });

    return (
        <div>
            <InGameUI
                gameOptions={gameOptions}
                setGameOptions={setGameOptions}
                setBoard={setBoard}
                cellsToReveal={cellsToReveal}
            />
            <canvas
                ref={canvasRef}
                width={numCellsWide * width + canvasWidthOffset}
                height={numCellsHigh * width + canvasHeightOffset}
                className="board"
                onClick={event => {
                    handleCanvasClick(
                        event,
                        "LEFT",
                        canvasRef,
                        width,
                        board,
                        setBoard,
                        setGameRunning,
                        gameOptions
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
