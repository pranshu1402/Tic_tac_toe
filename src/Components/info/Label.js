import React from 'react';
import './Label.css';

export default function Label(props) {
    return (
        <div className="label" onClick={()=>props.click(props.key)}>
            {props.moveInfo.chance}.
            <p> Player: {props.moveInfo.player===0?"1st":"2nd"} </p>
            <p> Position: {props.moveInfo.orig} </p>
        </div>
    );
}
