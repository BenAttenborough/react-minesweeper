import React, { Component } from 'react';
import './App.css';
import Board from "./components/Board/Board";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Minesweeper</h1>
		<div style={{display: 'inline-block'}}>
			<Board width={15} height={15} numBombs={40} />
		</div>
      </div>
    );
  }
}

export default App;
