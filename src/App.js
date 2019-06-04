import React, { useState, useEffect } from "react";
import "./App.css";
// import Board from "./components/Board/Board";
import Options from "./components/Options/Options";
import { createBoard } from "./CreateBoard";
import GameCanvas from "./components/Board/GameCanvas";
import InGameUI from "./components/InGameUI/InGameUI";

export default function App() {
    const [gameRunning, setGameRunning] = useState(false);

    const [gameOptions, setGameOptions] = useState({
        gameType: "square",
        height: 5,
        width: 15,
        numBombs: 8
    });

    const board = createBoard(
        gameOptions.width,
        gameOptions.height,
        gameOptions.numBombs,
        gameOptions.gameType
    );
    console.log(board);
    const [gameBoard, setGameBoard] = useState(board);

    console.log(gameOptions);

    // useEffect(

    // )

    return (
        <div className="App">
            <h1>Minesweeper</h1>
            {gameRunning ? (
                <div>
                    <InGameUI />
                    <GameCanvas board={gameBoard} setBoard={setGameBoard} />
                </div>
            ) : (
                <Options
                    setGameOptions={setGameOptions}
                    setGameRunning={setGameRunning}
                />
            )}
        </div>
    );
}
