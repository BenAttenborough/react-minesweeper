import React, { useState } from "react";
import "./App.css";
import Options from "./components/Options/Options";
import GameCanvas from "./components/Board/GameCanvas";

export default function App() {
    // const [gameRunning, setGameRunning] = useState(false);
    const [gameOptions, setGameOptions] = useState(null);

    return (
        <div className="App">
            <h1>Polysweeper</h1>
            {gameOptions ? (
                <GameCanvas
                    gameOptions={gameOptions}
                    setGameOptions={setGameOptions}
                />
            ) : (
                <Options setGameOptions={setGameOptions} />
            )}
        </div>
    );
}
