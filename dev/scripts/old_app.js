import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BlockPicker } from 'react-color';
// import {auth, googleAuthProvider} from 'firebase'
import axios from 'axios';
// import Login	from 'Login.js';
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA29RX-9kaKStwL1vWTWLHHYUwyzcpxMXU",
    authDomain: "makeup-project-eeddb.firebaseapp.com",
    databaseURL: "https://makeup-project-eeddb.firebaseio.com",
    projectId: "makeup-project-eeddb",
    storageBucket: "makeup-project-eeddb.appspot.com",
    messagingSenderId: "901597716132"
  };
firebase.initializeApp(config);

var apiURL = 'http://makeup-api.herokuapp.com/api/v1/products.json'
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
	constructor() {
		super();
		this.state = {
		  allMakeup:[]
		  selectedMakeup: [],
		  userInput:'',
		  searchTerms:'',
		};
	this.handleChange = this.handleChange.bind(this)
	this.handleClick = this.handleClick.bind(this)

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
		 //get chosen makeup
		const dbRef = firebase.database().ref();
		dbRef.on('value', (response) => {
		const newState = [];
		const obj = response.val();
		console.log(obj)

		  for (let key in obj) {
		    newState.push({
					    	name: obj[key].name, 
					    	brand:obj[key].brand, 
					    	category: obj[key].category, 
					    	imageURL:obj[key].imageURL
					    });
					 	
		 	console.log(newState)
		  }
		  this.setState({
		    selectedMakeup: newState
		  });

		  // get all makeup
		  axios.get(apiURL)
		    .then(res => {
		    	const allMakeup = res.data
		    })


		});
	}	

	removeProduct(){
		const dbRef = firebase.database().ref();
		dbRef.remove()
	}
	searchForProduct(){

	}
	addProduct(){

	}
    render() {
      return (
      	<div>

	      	<form>
		      	<input type="text" defaultValue="lipstick" onChange={this.handleChange}/>
		      	<button type="submit" onClick={this.searchForProduct}>Search Makeup Database</button>
		      	<button type="submit" onClick={this.handleClick}>Add to Display Case</button>
		      	
		      	<button type="submit">Change color</button>
		      	<button type="submit">Upload logo</button>
	      	</form>
	      	<h2>Display Case</h2>
	      	<ul className="selectedProductsList">
	      		{this.state.selectedMakeup.map((product, i) => {
	      			// console.log(product)
	      			return(
	      				<div>
		      				<li key={i}>
			      				<img src={product.imageURL} />
			      				<p>{product.brand}</p>
			      				<p>{product.category}</p>
			      				<p>{product.name}</p>
		  
		      					<button onClick={() =>this.removeProduct(i.id)}>Remove </button>
		      				</li>
		      			</div>
		      		)
	      		})}
	      	</ul>
      	</div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
