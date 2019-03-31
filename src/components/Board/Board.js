import React, {useState} from 'react';
import './board.css';
import Cell from './Cell/Cell';

const Board = ({height, width, numBombs}) => {

	const [gameRunning, setGameState] = useState(true);

	const createBoard = () => {
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
			const randomIdx = getRandomInt(nums.length);
			bombPositions.push(nums.splice(randomIdx, 1)[0]);
		}
	
		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				const cellNum = (y+x) + (y * (width - 1));
				row.push({revealed: false, bomb: bombPositions.includes(cellNum), cellNum, flag: false})
			}
			cells.push(row);
			row = [];
		}
		console.log("Board", cells)

		return cells;
	}

	const cells = createBoard()
	

	console.log(cells)

	const [data, setData] = useState(cells);
	console.log("data",data)

	const inBounds = (x,y) => {
		if (x < 0 || y < 0) {
			return null;
		}
		if (x > width - 1 || y > height - 1 ) {
			return null;
		} 
		return {x,y};
	}

	const getAdjCells = (x,y) => {
		let adjCells = [inBounds(x-1, y-1), inBounds(x, y-1), inBounds(x+1, y-1), inBounds(x-1, y), inBounds(x+1, y), inBounds(x-1, y+1), inBounds(x, y+1), inBounds(x+1, y+1)];
		return adjCells.filter(cell => cell !== null)
	}

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const adjCells = getAdjCells(x,y);
			let count = 0;
			adjCells.forEach(cell => {
				if (cells[cell.y][cell.x].bomb) {
					count ++;
				}
			})
			cells[y][x].count = count;
		}
	}

	// cell checking

	function cellCheck(x,y){
		const revealedCells = [];
		function checker(x,y) {
			const cell = data[y][x];
			if(cell.count === 0) {
				if(!revealedCells.some(cell => cell.x === x && cell.y ===y)){
					revealedCells.push({x,y});
					getAdjCells(x,y).forEach(cell => {
						checker(cell.x,cell.y)
					})
				} 
			} else {
				revealedCells.push({x,y});
			}
		}
		checker(x,y);
		return revealedCells
	}

	const clickFn = (x,y,e) => {
		e.preventDefault()
		console.log("click type", e.type)
		const cell = data[y][x];
		if (cell.bomb) {
			console.log("BANGG!");
			const dataCopy = data.map((y) => {
				return y.map((x) => {
					return Object.assign({}, x)
				})
			});
			dataCopy[y][x] = Object.assign({}, {...dataCopy[y][x], revealed:true})
			setData(dataCopy);
			setGameState(false);
		} else {
			console.log(cellCheck(x,y));
			const cellsToReveal=cellCheck(x,y);
			const dataCopy = data.map((y, yIdx) => {
				return y.map((x,xIdx) => {
					if (cellsToReveal.some(cell => cell.x === xIdx && cell.y === yIdx)) {
						return Object.assign({}, {...x, revealed:true} )
					} else {
						return Object.assign({}, x)
					}
				})
			});
			// data.forEach(y => {
			// 	console.log("y", y);
			// 	y.forEach(x => {
			// 		console.log("x", x)
			// 	})
			// })
			console.log("data", data)
			console.log("dataCopy", dataCopy)
			// console.log("dataCopy", dataCopy)
			// const dataCopy2 = data.map(item => Object.assign({}, item));
			// cellsToReveal.forEach(item => {
			// dataCopy2[item.y][item.x] = {revealed: true, ...dataCopy2[item.y][item.x]}
			// })
			// console.log("dataCopy", dataCopy)
			// console.log("dataCopy2", dataCopy2)

			setData(dataCopy)
		}
	}

	const handleRightClick = (x,y,event) => {
		event.preventDefault()
		console.log("dd")
		const dataCopy = data.map((y) => {
			return y.map((x) => {
				return Object.assign({}, x)
			})
		});
		dataCopy[y][x] = Object.assign({}, {...dataCopy[y][x], flag: !dataCopy[y][x].flag})
		setData(dataCopy);
	};

	const resetGame = () => {
		const cells = createBoard();
		setData(cells);
	}

	return (
		<div className='app'>
			<div>
			{
				gameRunning ? <p>Running</p> : <p>Game over!</p>
			}
			
			<div onClick={() => {resetGame()}}>
			<p>Reset</p>
			</div>
			
			</div>
			<div className='board' style={
				{
					gridTemplateColumns: `repeat(${width}, 25px)`,
					gridTemplateRows: `repeat(${height}, 25px)`
				}
				}>
				{
					data.map( (rows, y) => 
						rows.map((item, x) => {
							return <Cell clickFn={gameRunning ? e => {clickFn(x,y,e)} : null} handleRightClick={event => {handleRightClick(x,y,event)}} revealed={item.revealed} cellNum={item.cellNum} bomb={item.bomb} content={item.bomb ? "X" : item.count} flag={item.flag} />
						})
					)
				}
			</div>
		</div>
	)
}

export default Board;