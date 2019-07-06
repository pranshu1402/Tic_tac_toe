import React from 'react';
import Board from './board/Board';
import Info from './info/Info';
import './Game.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.newState();
  }

  newState() {
    return {
      turn: 0,
      chance: 1,
      symbol: ['X', 'O'],
      gameState: [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']],
      moves: new Map(),
      winner: -1,
      winnerCells: []
    };
  }

  changeTurn = () => {
    let { turn } = this.state;
    turn += 1;
    turn %= 2;
    return turn;
  }

  makeMove = (boardIndex) => {
    let { turn, chance, symbol, gameState, moves, winner, winnerCells } = this.state;
    if (!moves.has(boardIndex)) {
      const row = boardIndex[0];
      const column = boardIndex[1];

      // recording the moves
      moves.set(boardIndex, {
        chance: chance,
        orig: gameState[row][column],
        player: turn
      });

      // changing gamestate for the button clicked
      gameState[row][column] = symbol[turn];

      // changing turn for next move
      turn = this.changeTurn();

      chance++;

      const result = this.checkResult(gameState, moves.size);
      winner = result[0];
      winnerCells = result[1];

      this.setState({
        gameState,
        turn,
        moves,
        chance,
        winner,
        winnerCells
      });

    }
  }

  revertMoves = (boardIndex) => {
    let { gameState, chance, moves, turn } = this.state;

    let boardIndices = [...moves.keys()];
    let indexOfStepToRevert = boardIndices.indexOf(boardIndex);
    chance = chance - (boardIndices.length - indexOfStepToRevert) + 1;

    //get the player whose move is clicked, then set the turn to next player..
    turn = moves.get(boardIndex).player;

    for(let index= indexOfStepToRevert; index<boardIndices.length; index++){
      const indices = boardIndices[index];
      const move = moves.get(indices);
      const row = indices[0];
      const column = indices[1];
      gameState[row][column] = move.orig;
      moves.delete(indices);
    };

    const result = this.checkResult(gameState, moves.size);

    this.setState({
      turn,
      chance,
      gameState,
      moves,
      winner: result[0],
      winnerCells: result[1]
    });
  }

  checkResult = (gameState, moves) => {

    const lines = [
      ["00", "01", "02"],
      ["10", "11", "12"],
      ["20", "21", "22"],
      ["00", "10", "20"],
      ["01", "11", "21"],
      ["02", "12", "22"],
      ["00", "11", "22"],
      ["02", "11", "20"],
    ];

    for (const line of lines) {
      const symbola = gameState[line[0][0]][line[0][1]];
      const symbolb = gameState[line[1][0]][line[1][1]];
      const symbolc = gameState[line[2][0]][line[2][1]];
      if ((symbola === symbolb) && (symbola === symbolc)) {
        return [symbola, line];
      }
    };

    // if the board is fully filled, game completes with no winner.
    if (moves === 9) {
      return ["Oops! it's a draw. Reset to play!", []];
    }

    return [-1, []];
  }

  reset = () => {
    this.setState(this.newState());
  }

  render() {
    const { turn, symbol, gameState, moves, winner, winnerCells } = this.state;

    return (
      <div className="game">

        <h1> TIC - TAC - TOE </h1>

        <Board gameState={gameState}
          symbol={winner === -1 ? symbol[turn] : winner}
          changed={moves}
          hasWinner={winner === -1 ? false : true}
          makeMove={(index) => this.makeMove(index)}
          winnerCells={winnerCells} />

        <Info moves={moves}
          reset={this.reset}
          click={this.revertMoves} />
      </div>

    );
  }
}

export default Game;