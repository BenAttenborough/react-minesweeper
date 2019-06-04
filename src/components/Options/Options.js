import React, { useState } from "react";
import "./options.css";

export default function({ setGameOptions, setGameRunning }) {
    const [gameType, setGameType] = useState("SQUARE");
    const [height, setHeight] = useState(5);
    const [width, setWidth] = useState(15);
    const [numBombs, setNumBombs] = useState(20);

    function handleSubmit(event) {
        event.preventDefault();
        const gameOptions = {
            gameType,
            height,
            width,
            numBombs
        };
        setGameOptions(gameOptions);
        setGameRunning(true);
    }
    return (
        <div className="panel">
            <form onSubmit={handleSubmit}>
                <label>Game type:</label>
                <select
                    value={gameType}
                    onChange={event => setGameType(event.target.value)}
                >
                    <option value="SQUARE">Square</option>
                    <option value="HEX">Hex</option>
                </select>
                <label>Height:</label>
                <input
                    type="number"
                    name="height"
                    id="height"
                    value={height}
                    onChange={event => setHeight(event.target.value)}
                />
                <label>Width:</label>
                <input
                    type="number"
                    name="width"
                    id="width"
                    value={width}
                    onChange={event => setWidth(event.target.value)}
                />
                <label>Number of bombs:</label>
                <input
                    type="number"
                    name="numBombs"
                    id="numBombs"
                    value={numBombs}
                    onChange={event => setNumBombs(event.target.value)}
                />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}
