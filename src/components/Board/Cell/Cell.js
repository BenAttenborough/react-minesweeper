import React, {useState} from 'react';
import './cell.css';

const Cell = ({clickFn, revealed, cellNum, bomb, content}) => {
	// console.log
	console.log(`cellNum ${cellNum} bomb: ${bomb} revealed: ${revealed}`)
	// const [status, setStatus] = useState({cleared: false});
	const cellClass = ['cell'];
	if (revealed) {
		cellClass.push('cleared')
	};
	if (bomb) {
		cellClass.push('bomb')
	}
	// const clickFn = () => {
	// 	console.log(`Cell x=${x} y=${y}`);
	// 	setStatus({cleared: true})
	// }
	return (
		// <div className={status.cleared ? 'cell cleared' : 'cell'} onClick={clickFn}>
		<div className={cellClass.join(' ')} onClick={clickFn}>
			{revealed ? content : ""}
		</div>
	)
}

export default Cell;