import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BlockPicker } from 'react-color';
import SearchBar from './SearchBar.js';
import SavedProduct from './SavedProduct.js';
import SearchedProduct from './SearchedProduct.js';
import UserDashboard from './UserDashboard.js';
import Login from './Login.js';
import DisplayCase from './DisplayCase.js';

// import {auth, googleAuthProvider} from 'firebase'
import axios from 'axios';
  // Initialize Firebase
const config = {
    apiKey: "AIzaSyA29RX-9kaKStwL1vWTWLHHYUwyzcpxMXU",
    authDomain: "makeup-project-eeddb.firebaseapp.com",
    databaseURL: "https://makeup-project-eeddb.firebaseio.com",
    projectId: "makeup-project-eeddb",
    storageBucket: "makeup-project-eeddb.appspot.com",
    messagingSenderId: "901597716132"
	};
firebase.initializeApp(config);

// login
// show display case
// show display case options
	// theme color
	// upload logo

// search for a product using a keyword
// return products associated with that keyword
// select products
// add products to display case
// remove products from display case

// get URL for display case

class App extends React.Component {
	constructor(props) {
	super();

	}

	handleChange(event) {
	  this.setState({userInput: event.target.value})
	}

	handleClick(){
		const dbRef = firebase.database().ref();
		dbRef.push(this.state.userInput);
		this.setState({userInput: ''})
	}

	componentDidMount(){
		// get chosen makeup
		const dbRef = firebase.database().ref();
	}	


    render() {
      return (
      	<div>
      	
      	 	<Login />

      	</div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
