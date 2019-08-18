import React from "react";
import { resetBoard } from "../../gameLogic";

export default function InGameUI({
    gameOptions,
    setGameOptions,
    setBoard,
    cellsToReveal
}) {
    console.log(">>>>gameOptions", gameOptions);
    // const [cellsToReveal, setCellsToReveal] = useState(height * width);

    return (
        <div className={"inGameUI"}>
            <button
                onClick={() => {
                    resetBoard(gameOptions, setBoard);
                }}
                style={{ marginRight: 1 + "rem" }}
            >
                Reset
            </button>
            <button
                onClick={() => {
                    setGameOptions(null);
                }}
            >
                New Game
            </button>
            <p>Cells to reveal: {cellsToReveal}</p>
        </div>
    );
}
