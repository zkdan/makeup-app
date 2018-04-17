import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Product extends Component {
	constructor() {
		super();
		this.state = {
		  userInput:'',
		  searchReturn:[]
		} 
	};

	componentDidMount(){
		const dbRef = firebase.database().ref();
		console.log(dbRef)
	}

    render() {
      return (
        <div>
        	<div className="product-card">
	        	<img src={this.props.image} height="200px"/>
		    	<p>{this.props.brand}</p>
	        	<p>{this.props.productName}</p>
	    	</div>
	    	<button onClick={this.addToCase}> Add to Display Case</button>
        </div>
      )
    }
}

export default Product;

