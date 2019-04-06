import React from 'react';
import './cell.css';

const Cell = ({clickFn, revealed, cellNum, bomb, content, handleRightClick, flag}) => {
	
	function setNumColour (num) {
		switch(num) {
			case 1:
				return "#0b24fb"
			case 2:
				return "#228224";
			case 3:
				return "#fc0d1b";
			case 4:
				return "#020b79";
			case 5:
				return "#86272b";
			case 6:
				return "#007b7b";
			case 7:
				return "#090002";
			case 8:
				return "#7b7b7b";
			default:
				return "#000"
		}
	}

	const cellClass = ['cell'];
	// revealed = true;
	if (revealed) {
		cellClass.push('cleared')
	};
	if (revealed && bomb) {
		cellClass.push('bomb')
	}
	let cellContent = "";
	let numColour = "#FFFFFF";
	if (revealed && content !== 0) {
		cellContent = content;
		numColour = setNumColour(content)
	} else if (!revealed && flag) {
		cellContent = "F"
	}
	return (
		<div className={cellClass.join(' ')} onClick={clickFn} onContextMenu={handleRightClick} style={{color: numColour}}>
			{cellContent}
		</div>
	)
}

export default Cell;