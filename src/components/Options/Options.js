import React, { useState, useEffect } from "react";
import "./options.css";

export default function({ setGameOptions }) {
    const [gameType, setGameType] = useState("SQUARE");
    const [height, setHeight] = useState(15);
    const [width, setWidth] = useState(15);
    const [numBombs, setNumBombs] = useState(50);

    useEffect(() => {
        // console.log(">>>>>> Options updated >>>>>>");
    });

    function handleSubmit(event) {
        event.preventDefault();
        const gameOptions = {
            gameType,
            height,
            width,
            numBombs
        };
        setGameOptions(gameOptions);
    }

    return (
        <div className="panel">
            <form onSubmit={handleSubmit} className="optForm">
                <div className="optItem">
                    <label>Game type:</label>
                    <select
                        value={gameType}
                        onChange={event => setGameType(event.target.value)}
                    >
                        <option value="SQUARE">Square</option>
                        <option value="HEX">Hex</option>
                    </select>
                </div>
                <div className="optItem">
                    <label>Height:</label>
                    <input
                        type="number"
                        name="height"
                        id="height"
                        value={height}
                        onChange={event =>
                            setHeight(parseInt(event.target.value))
                        }
                    />
                </div>
                <div className="optItem">
                    <label>Width:</label>
                    <input
                        type="number"
                        name="width"
                        id="width"
                        value={width}
                        onChange={event =>
                            setWidth(parseInt(event.target.value))
                        }
                    />
                </div>
                <div className="optItem">
                    <label>Number of bombs:</label>
                    <input
                        type="number"
                        name="numBombs"
                        id="numBombs"
                        value={numBombs}
                        onChange={event => setNumBombs(event.target.value)}
                    />
                </div>
                <div>
                    <input type="submit" value="Play" className="optSubmit" />
                </div>
            </form>
        </div>
    );
}
