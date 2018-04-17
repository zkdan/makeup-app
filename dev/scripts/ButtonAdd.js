import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class ButtonAdd extends Component {
	constructor() {
		super();
		this.state = {
		  userInput:'',
		  searchReturn:[]
		} 
	};

	componentDidMount(){
		const dbRef = firebase.database().ref();
		// console.log(dbRef)
	}

    render() {
      return (
        <button  onClick={this.addToCase}>
        	Add to Display Case
        </button>
      )
    }
}

export default ButtonAdd;

