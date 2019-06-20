import React from 'react';
import Label from './Label';
import './Info.css';

export default function Info(props){
       return (
            <div className="info">
                <span>Moves: </span> <button onClick={props.reset} className='reset'>RESET</button>
                {[...props.moves.keys()].map((i) => <Label 
                                                        key={i} 
                                                        moveInfo={props.moves.get(i)}
                                                        click={props.click}/> 
                                                    
                )}
            </div>
        );
}
