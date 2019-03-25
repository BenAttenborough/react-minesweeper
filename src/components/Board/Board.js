import React, {useState} from 'react';
import './board.css';
import Cell from './Cell/Cell';

const Board = ({height, width, numBombs}) => {

	let cells = [];
	let row = [];
	let numCells = height * width;
	let nums = [];
	let bombPositions = [];

	function getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	  }

	for (let i = 0; i < numCells; i++) {
		nums.push(i)
	};
	for (let i = 0; i < numBombs; i++) {
		// console.log(`Random number ${i}: ${getRandomInt(nums.length)}`)
		const randomIdx = getRandomInt(nums.length);
		bombPositions.push(nums.splice(randomIdx, 1)[0]);
	}

	console.log("Random bomb positions:", bombPositions)

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			// row.push(() => <Cell clickFn={cellClickGenerator(x,y)}/>)
			// console.log("x:", x)
			// console.log("y:", y)
			// console.log("Cell number:", (y+x) + (y * (width - 1)))
			const cellNum = (y+x) + (y * (width - 1));
			row.push({revealed: false, bomb: bombPositions.includes(cellNum), cellNum})
		}
		cells.push(row);
		row = [];
	}

	const inBounds = (x,y) => {
		if (x < 0 || y < 0) {
			return null;
		}
		if (x > width - 1 || y > height - 1 ) {
			return null;
		} 
		return {x,y};
	}

	const search = (x,y) => {
		// console.log("search x")
		// console.log(cells[y][x])
		let adjCells = [inBounds(x-1, y-1), inBounds(x, y-1), inBounds(x+1, y-1), inBounds(x-1, y), inBounds(x+1, y), inBounds(x-1, y+1), inBounds(x, y+1), inBounds(x+1, y+1)];
		adjCells = adjCells.filter(cell => cell !== null)
		let count = 0;
		adjCells.forEach(cell => {
			if (cells[cell.y][cell.x].bomb) {
				count ++;
			}
		})
		// console.log(`There are ${count} bombs adjacent to this cell`);
		return count;
	}

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			cells[y][x].count = search(x,y);
		}
	}
	
	const [data, setData] = useState(cells);

	// console.log("Cells:", cells)

	const cellClickGenerator = (x,y) => {
		return function cellClick() {
			console.log(`Cell x=${x} y=${y}`);
			setData(state => {
				const newData = state.map((outer,outerIdx) => {
					if (y === outerIdx) {
						return outer.map( (inner, innerIdx) => {
							if (innerIdx === x) {
								return () => {return {revealed: true, bomb: false}}
							} else {
								return inner
							}
						})
					} else {
						return outer;
					}
					
				});
				return newData;
			})
		}
	}

	const clickFn = (x,y) => {
		console.log(`Cell x(${x}) y(${y}) click`);
		search(x,y);
		let adjCells = [inBounds(x-1, y-1), inBounds(x, y-1), inBounds(x+1, y-1), inBounds(x-1, y), inBounds(x, y), inBounds(x+1, y), inBounds(x-1, y+1), inBounds(x, y+1), inBounds(x+1, y+1)]
		// console.log(`In bounds x ${x}, y ${y}`, inBounds(x,y))
		adjCells = adjCells.filter(cell => cell !== null)
		// console.log("Adjacent cells:", adjCells)
		// console.log("adjCells includes 0,0:", adjCells.some(cell => 
		// 	cell.x === 0 && cell.y === 0
		// ))

		// setData(state => {
		// 	// Replace the cells in adjCells

			const newData = data.map((rows, rowsIdx) => {
				return rows.map((cell, cellIdx) => {
					// if (adjCells.some(cell => cell.x === cellIdx && cell.y === rowsIdx)) {
					if (rowsIdx === y && cellIdx === x) {
						return {...cell, revealed: true}
					} else {
						return cell
					}
				});
			});
			console.log(newData)
			setData(newData);
		
	}

	// console.log("DATA >>> ", data)
	return (
		<div className='board' style={
			{
				gridTemplateColumns: `repeat(${width}, 25px)`,
				gridTemplateRows: `repeat(${height}, 25px)`
			}
			}>
			{
				data.map( (rows, y) => 
					rows.map((item, x) => {
						return <Cell clickFn={clickFn.bind(null, x, y)} revealed={item.revealed} cellNum={item.cellNum} bomb={item.bomb} content={item.count} />
					})
				)
			}
		</div>
	)
}

export default Board;