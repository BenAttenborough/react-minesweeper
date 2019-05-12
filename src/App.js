import React, { Component, useState } from "react";
import "./App.css";
import Board from "./components/Board/Board";
import Options from "./components/Options/Options";

export default function App() {
    const [gameType, setGameType] = useState("HEX");

    const handleChange = event => {
        setGameType(event.target.value);
    };

    return (
        <div className="App">
            <h1>Minesweeper</h1>
            <div style={{ display: "inline-block" }}>
                <Options handleChange={handleChange} gameType={gameType} />
            </div>
            <div style={{ display: "inline-block" }}>
                <Board width={20} height={20} numBombs={40} type={gameType} />
            </div>
        </div>
    );
}
