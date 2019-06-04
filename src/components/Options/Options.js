import React, { useState } from "react";
import "./options.css";

export default function({ handleChange, gameType }) {
    return (
        <div className="panel">
            <form>
                <label>Game type:</label>
                <select
                    value={gameType}
                    onChange={event => handleChange(event)}
                >
                    <option selected value="SQUARE">
                        Square
                    </option>
                    <option value="HEX">Hex</option>
                </select>
                <label>Height:</label>
                <input type="number" name="height" id="height" />
                <label>Width:</label>
                <input type="number" name="width" id="width" />
                <label>Number of bombs:</label>
                <input type="number" name="numBombs" id="numBombs" />
            </form>
        </div>
    );
}
