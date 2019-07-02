import React, { useState, useEffect } from "react";
import "./App.css";
import Options from "./components/Options/Options";
import GameCanvas from "./components/Board/GameCanvas";

export default function App() {
    // const [gameRunning, setGameRunning] = useState(false);
    const [gameOptions, setGameOptions] = useState(null);

    return (
        <div className="App">
            <h1>Minesweeper</h1>
            {gameOptions ? (
                <GameCanvas
                    gameOptions={gameOptions}
                    // setGameRunning={setGameRunning}
                />
            ) : (
                <Options
                    setGameOptions={setGameOptions}
                    // setGameRunning={setGameRunning}
                />
            )}
        </div>
    );
}
