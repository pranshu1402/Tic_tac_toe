import React from 'react';
import './Square.css';

export default class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idx : props.idx
        };
    }

    render(){
        return (
            <button className="square" 
                    style={{color:this.props.color}} 
                    onClick={this.props.onClick} 
                    disabled={this.props.disable}>
                {this.props.show}
            </button>
      );
    }
}
