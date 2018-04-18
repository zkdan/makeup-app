import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import SavedProduct from './SavedProduct.js';

class DisplayCase extends Component {
  constructor(props) {
    super();
    this.state = {
      selectedProducts:[],
      hasItems:false,
      displayMessage:'Add some products!'
    };
  }

  componentDidMount(){
     //get chosen makeup
    const dbRef = firebase.database().ref(`${this.props.userName}`+'/products/');
    dbRef.on('value', (response) => {
      const data = response.val();
      const productArray =[]
      console.log(data)

      for (let value of Object.values(data)){
        productArray.push(value)
      }

      this.setState({
        selectedProducts:productArray,
        hasItems:true
      })
    });
  } 

  render() {
    return (
      <div className="display-case">
        <h2>Display Case</h2>
        <img className="display-case__logo" src={this.props.logo} />
        {this.state.hasItems ? (
          <ul className="display-case__item-container">
            {this.state.selectedProducts.map((item) => {
                return <SavedProduct key={item.id} id={item.id} brand={item.brand} image={item.image} productName={item.name} userName={this.props.userName}/>
            })}
          </ul> ) : (

            <p className="display-case__message">{this.state.displayMessage}</p> 
          )}
                
      </div> 
    )
  }
}

export default DisplayCase;

