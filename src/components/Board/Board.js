import React, {useState} from 'react';
import './board.css';
import Cell from './Cell/Cell';
import Counter from '../Counter/Counter';
import "typeface-vt323";
import smiley from "../../img/Smiley.png"
import smileyOh from "../../img/SmileyOh.png"
import smileyHit from "../../img/SmileyHit.png"

const Board = ({height, width, numBombs, type}) => {

	const [gameRunning, setGameState] = useState(true);

	const numSquares = height * width;

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
		if (type === "HEX") {
			if ( y % 2 == 0) {
				adjCells = [inBounds(x, y-1), inBounds(x+1, y-1), inBounds(x-1, y), inBounds(x+1, y), inBounds(x, y+1), inBounds(x+1, y+1)];
			} else {
				adjCells = [inBounds(x-1, y-1), inBounds(x, y-1), inBounds(x-1, y), inBounds(x+1, y), inBounds(x-1, y+1), inBounds(x, y+1)];
			}
		}
		return adjCells.filter(cell => cell !== null)
	}

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
				// console.log("cellNum", cellNum)
				row.push({revealed: false, bomb: bombPositions.includes(cellNum), cellNum, flag: false})
			}
			cells.push(row);
			row = [];
		}
		console.log("Board", cells)

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

		return cells;
	}

	const cells = createBoard()
	const [data, setData] = useState(cells);

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
		if (!gameRunning) {
			setGameState(true)
		}
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
			setData(dataCopy)
		}
	}

	const handleRightClick = (x,y,event) => {
		event.preventDefault()
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
		setData(cells,setGameState(true));
	}

	const getNumRevealed = () => {
		let numRevealed = 0

		data.forEach(item => {
			numRevealed = item.reduce( (curr,next) => {
				if (next.revealed) {
					return curr + 1;
				} 
				return curr
				
			}, numRevealed )
		})
		return numRevealed;
	}

	const getNumFlags = () => {
		let numFlags = 0

		data.forEach(item => {
			numFlags = item.reduce( (curr,next) => {
				if (next.flag) {
					return curr + 1;
				} 
				return curr
				
			}, numFlags )
		})
		return numFlags;
	}

	const numRevealed = getNumRevealed();

	const numFlags = getNumFlags();

	// console.log("numRevealed", numRevealed)

	let templateCols = ``;

	switch(type) {
		case "HEX":
			templateCols = `repeat(${(width * 2) + 1}, 10px)`;
			break;
		default:
			templateCols = `repeat(${width * 2}, 10px)`;
	}

	let offset = false;

	return (
		<div className='app'>
			<div>
				<div className="controlContainer">
					{/* <Counter className="numberBox" start={gameRunning} /> */}
					<div onClick={() => {resetGame()}} className="button">
						{
							gameRunning ? <img src={smiley} alt="Reset game" /> : <img src={smileyHit} alt="Reset game" />
						}
					</div>
					<p className="numberBox">{numBombs - numFlags}</p>
				</div>
			</div>
			<div className='board' style={
				{
					gridTemplateColumns: templateCols,
					gridTemplateRows: `repeat(${height}, 20px)`
				}
				}>
				{
					data.map( (rows, y) => {
						return rows.map((item, x) => {
							if (type === "HEX") {
								if (y % 2 === 0 && x === 0) {
									offset = true;
									return [<div style={{gridColumnEnd: "span " + 1}}></div>,<Cell clickFn={gameRunning ? e => {clickFn(x,y,e)} : null} handleRightClick={event => {handleRightClick(x,y,event)}} revealed={item.revealed} key={item.cellNum} cellNum={item.cellNum} bomb={item.bomb} content={item.bomb ? "X" : item.count} flag={item.flag} offset={true} />]
								}
								if ( y % 2 !== 0 && x === 14) {
									offset = false;
									return [<Cell clickFn={gameRunning ? e => {clickFn(x,y,e)} : null} handleRightClick={event => {handleRightClick(x,y,event)}} revealed={item.revealed} key={item.cellNum} cellNum={item.cellNum} bomb={item.bomb} content={item.bomb ? "X" : item.count} flag={item.flag} offset={false}/>, <div style={{gridColumnEnd: "span " + 1}}></div>]
								}
								if (y % 2 !== 0) {
									offset = false;
								}
							}
							return <Cell clickFn={gameRunning ? e => {clickFn(x,y,e)} : null} handleRightClick={event => {handleRightClick(x,y,event)}} revealed={item.revealed} key={item.cellNum} cellNum={item.cellNum} bomb={item.bomb} content={item.bomb ? "X" : item.count} flag={item.flag} offset={offset} />
						})
						}
					)
				}
			</div>
			<div className="announce">
					{
						gameRunning ? null : numSquares - (numRevealed + numBombs) === 0 ? <p>Win!</p> : <p>Game over!</p>
					}
				</div>
		</div>
	)
}

export default Board;