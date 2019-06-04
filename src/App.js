import React, { useState } from "react";
import "./App.css";
// import Board from "./components/Board/Board";
import Options from "./components/Options/Options";
import { createBoard } from "./CreateBoard";
import GameCanvas from "./components/Board/GameCanvas";

export default function App() {
    const [gameType, setGameType] = useState("SQUARE");

    const handleChange = event => {
        setGameType(event.target.value);
    };

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

    return (
        <div className="App">
            <h1>Minesweeper</h1>
            {gameRunning ? (
                <GameCanvas board={gameBoard} setBoard={setGameBoard} />
            ) : (
                <Options
                    setGameOptions={setGameOptions}
                    setGameRunning={setGameRunning}
                />
            )}
        </div>
    );
}
