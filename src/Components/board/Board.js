import React from 'react';
import Square from './Square';
import './Board.css';

function constructBoard(gameState, makeMove, changed, complete, winnerCells){
    // array for square buttons
    let squares = [];
    
    var rowLen = gameState.length;
    var columnLen= gameState[0].length;

    // pushing Square component in array
    for(var i=0;i<rowLen;i++){        
        for(var j=0;j<columnLen;j++){
            let index = i+''+j;
            let color = 'black';

            // check if game is completed then disable all else check 
            //if particular square has been touched or not before
            const disable = complete?true:(changed.has(index)?true:false);
            if(disable)
                color= 'gray';

            //if winner is declared then match the indexes and make color white.
            if(winnerCells!==undefined){
                for(let k=0;k<winnerCells.length;k++){
                    let a = winnerCells[k][0];
                    let b = winnerCells[k][1];
                    // eslint-disable-next-line
                    if(i==a && j==b){
                        color= 'white';
                    }
                }
            }

            squares.push(<Square 
                                key={index}
                                onClick={()=> makeMove(index)}
                                show = {gameState[i][j]} 
                                disable = {disable}
                                color= {color}
                        /> 
                        )
        }
        // after row completes moving to nextLine
        squares.push(<br key={i}/>);
    }
    return squares;
}

export default function Board(props){
 
    return  ( <div className="board">

                <div className="status">
                    {props.hasWinner?"Winner: ":"Player turn: "} {props.symbol}
                </div>
                
                <div className="playboard">
                    {constructBoard(props.gameState, props.makeMove, props.changed, props.hasWinner, props.winnerCells)}
                </div>
              
              </div>
            );
}