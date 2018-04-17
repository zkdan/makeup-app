import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';



class SearchedProduct extends Component {
	constructor(props) {
		super();
		this.state = {
		  buttonValue:'Add to Display Case',
		  buttonState:'active',
		  selected: false,
		  disabled:false		
		}

		this.addProduct = this.addProduct.bind(this)
	};

	componentDidMount(){

	}

	addProduct(event){
		event.preventDefault();
		this.setState({
			buttonState: 'inactive',
			buttonValue: 'Added to Display Case',
			selected:true,
			disabled:true

		})
		const dbRef = firebase.database().ref( `${this.props.userName}` +'/products/' + `${this.props.id}`);
		// console.log(`${this.props.userName}` + '/products/' + `${this.props.id}`)
		const newProduct = {
			"id":this.props.id,
			"brand":this.props.brand,
			"name":this.props.productName,
			"image":this.props.image,
			"productType":this.props.productType
		}
		dbRef.set(newProduct)

	}
    render() {
      return (
        <li className={"search-case__item--" + this.state.buttonState}>
        	<div className="search-case__item-info" key={this.props.id} >
	        	<img  className="search-case__image" src={this.props.image} height="200px"/>
		    	<p className="search-case__brand" >{this.props.brand}</p>
	        	<p className="search-case__product-name" >{this.props.productName}</p>
	    	</div>
	    	<button onClick={this.addProduct} disabled={this.state.disabled}>{this.state.buttonValue}</button>
        </li>
      )
    }
}

export default SearchedProduct;

