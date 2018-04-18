import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchedProduct from './SearchedProduct.js';

import axios from 'axios';

const apiURL = 'https://makeup-api.herokuapp.com/api/v1/products.json?'
const brandURL = 'brand='
const productTypeUrl = 'product_type='


class SearchBar extends Component {
	constructor(props) {
		super();
		this.state = {
		  userInput:'',
		  searchReturn:[]
		} 
		this.handleChange = this.handleChange.bind(this);
		this.searchByBrand = this.searchByBrand.bind(this);
		this.searchByProductType = this.searchByProductType.bind(this);
		this.clearSearch = this.clearSearch.bind(this);

	};

	handleChange(event) {
		this.setState({userInput:event.target.value})
	}

	searchByBrand(event){
		event.preventDefault()

		let chosenBrand = this.state.userInput
		let data
		// console.log(apiURL + brandURL + chosenBrand)
		axios.get(apiURL + brandURL + chosenBrand)
		  .then(res => {
		  
		   data = res.data;		  	

			  this.setState({
			  	userInput:'',
			  	searchReturn: data
			  })
		  })

		//Ryan COMMENT!
		/* 
		  With axios, we can pass in and object that will allow us to build up the query we want. This will look a lot like jQuery!

		  Instead of building it from vars like `apiURL + brandURL + chosenBrand`. We can do this.

		  axios({
			  url: theurl,
			  method: 'GET',
			  params: {
				  brand: thebrand,
				  product_type: theproduct
			  }
		  })

		  this helps make it a bit cleaner!

		  Also curious to the thought process around setting a `data` variable outside of request, and then assigning the data inside.

		*/
	}

	searchByProductType(event){
		// console.log(this.props.user);
		event.preventDefault()
		let chosenProductType = this.state.userInput
		chosenProductType = chosenProductType.replace(/ /g,"_");
		let data
		// console.log(apiURL + productTypeUrl + chosenProductType)
		axios.get(apiURL + productTypeUrl + chosenProductType)
		  .then(res => {
		  
		    data = res.data;		  	
		 
			this.setState({
				userInput:'',
				searchReturn: data
			})

		  })
	}
	clearSearch(event){
		event.preventDefault();
		this.setState({
			userInput:'',
			searchReturn:[]
		})
	}

    render() {
      return (
        <div className="search-bar">
			<form>
		      	<input type="text" onChange={this.handleChange} />
		      	<button type="submit" onClick={this.searchByBrand}>Search Brands</button>
		      	<button type="submit" onClick={this.searchByProductType}>Search Product Types</button>
		      	<button type="submit" onClick={this.clearSearch}>Clear Search</button>

			</form>
			<div className="search-case">
				<ul className="search-case__item-container">

		            {this.state.searchReturn.map((item, i) => {
		                return <SearchedProduct userName={this.props.userName} key={item.id} id={item.id} brand={item.brand} image={item.image_link} productType={item.product_type} productName={item.name} />
		            })}
	  	    	</ul>	
  	    	</div>	
		</div>
      )
    }
}

export default SearchBar;

