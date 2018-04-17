import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class ButtonDelete extends Component {
	constructor() {
		super();
		this.state = {
	
		} 
	};

	componentDidMount(){
		const dbRef = firebase.database().ref();
		dbRef.remove()
	}

    render() {
      return (
        <button  onClick={this.removeFromCase}>
        	Remove From Display CAse
        </button>
      )
    }
}

export default ButtonDelete;

