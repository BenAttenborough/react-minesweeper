import React from "react";
import { resetBoard } from "../../gameLogic";

export default function InGameUI({ gameOptions, setGameOptions, setBoard }) {
    // console.log("gameOptions", gameOptions);
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
        </div>
    );
}
