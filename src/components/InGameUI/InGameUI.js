import React from "react";
import { resetBoard, showMenu } from "../../gameLogic";

export default function InGameUI({ gameOptions, setBoard }) {
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
                    showMenu();
                }}
            >
                New Game
            </button>
        </div>
    );
}
