import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class SavedProduct extends Component {
  constructor(props) {
    super();
    this.state = {
      displayMessage:''
    };
    this.removeProduct = this.removeProduct.bind(this)
  }
  componentDidMount(){
  
  }
  removeProduct(event){
    event.preventDefault;
    const dbRef = firebase.database().ref( `${this.props.userName}` +'/products/' + `${this.props.id}`);
    // console.log(`${this.props.userName}` +'/products/' + `${this.props.id}`)
    dbRef.remove();
    // console.log('remove')
  }
  render() {
    return (
      <li key={this.props.id} className="display-case__item">
        <div className="display-case__item-info">
          <img  className="display-case__image" src={this.props.image}/>
          <p className="display-case__brand" >{this.props.brand}</p>
          <p className="display-case__product-name" >{this.props.productName}</p>
        </div>
        <button className="display-case__button display-case__button--remove" onClick={this.removeProduct}>Remove from Display Case</button>
      </li>
    )
  }
}

export default SavedProduct;

