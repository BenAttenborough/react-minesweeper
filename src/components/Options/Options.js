import React, {useState} from 'react';
import './options.css'

export default function({handleChange, gameType}) {
	return (
		<div className="panel">
			<form>
				<label>
					Game type:
				</label>
				<select value={gameType} onChange={event => handleChange(event)}>
					<option selected value="SQUARE">Square</option>
					<option value="HEX">Hex</option>
				</select>	
			</form>
		</div>
	)
}