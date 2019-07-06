import React from 'react';
import Label from './Label';
import './Info.css';

export default function Info(props) {
    return (
        <div className="info">
            <span>Moves: </span> <button onClick={props.reset} className='reset'>RESET</button>
            {
                [...props.moves.keys()].map((boardIndex) => <Label
                    key={boardIndex}
                    index={boardIndex}
                    moveInfo={props.moves.get(boardIndex)}
                    click={props.click} />
                )
            }
        </div>
    );
}
