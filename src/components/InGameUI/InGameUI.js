import React from "react";
import { resetBoard } from "../../gameLogic";

export default function InGameUI({ gameOptions, setGameOptions, setBoard }) {
    console.log("gameOptions", gameOptions);
    return (
        <div>
            <p>Ingame UI</p>
            <button
                onClick={() => {
                    resetBoard(gameOptions, setBoard);
                }}
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
