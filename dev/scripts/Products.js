import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Products extends Component {
	componentDidMount(){

	}

    render() {
      return (
        <div>
          this is  Products
  	    	<ul className="selectedProductsList">
            {this.state.searchReturn.map((brand, productType, image ) => {
                return <Product brand={brand} image={image} productType={productType} />
            })}
  	    	</ul>
        </div>
      )
    }
}

export default Products;

