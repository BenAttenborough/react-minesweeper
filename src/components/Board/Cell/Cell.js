import React, {useState} from 'react';
import './cell.css';

const Cell = ({clickFn, revealed, cellNum, bomb, content, handleRightClick, flag}) => {
	const cellClass = ['cell'];
	if (revealed) {
		cellClass.push('cleared')
	};
	if (revealed && bomb) {
		cellClass.push('bomb')
	}
	let cellContent = "";
	if (revealed && content !== 0) {
		cellContent = content
	} else if (!revealed && flag) {
		cellContent = "F"
	}
	return (
		<div className={cellClass.join(' ')} onClick={clickFn} onContextMenu={handleRightClick}>
			{cellContent}
		</div>
	)
}

export default Cell;