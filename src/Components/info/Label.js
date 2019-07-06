import React from 'react';
import './Label.css';

export default function Label(props) {
    const {moveInfo, index, click:onclick} = props;
    return (
        <div className="label" onClick={()=>onclick(index)}>
            {moveInfo.chance}.
            <p> Player: {moveInfo.player===0?"1st":"2nd"} </p>
            <p> Position: {moveInfo.orig} </p>
        </div>
    );
}
