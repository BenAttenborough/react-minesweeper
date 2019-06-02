import React, { useState } from "react";
import "./App.css";
// import Board from "./components/Board/Board";
// import Options from "./components/Options/Options";
import { createBoard } from "./CreateBoard";
import GameCanvas from "./components/Board/GameCanvas";

export default function App() {
    const [gameType, setGameType] = useState("SQUARE");

    const handleChange = event => {
        setGameType(event.target.value);
    };

    const board = createBoard(15, 5, 5, gameType);
    console.log(board);
    const [gameBoard, setGameBoard] = useState(board);

    return (
        <div className="App">
            <h1>Minesweeper</h1>
            <GameCanvas board={gameBoard} setBoard={setGameBoard} />
        </div>
    );
}
