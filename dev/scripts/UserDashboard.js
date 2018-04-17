import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import SearchBar from './SearchBar.js';

class UserDashboard extends Component {
  constructor() {
  super();  
  this.state={
    logoURL:'',
    themeColor:'red'
  }

    this.saveLogo = this.saveLogo.bind(this)
    this.saveColor = this.saveColor.bind(this)

    this.handleChange = this.handleChange.bind(this)
    this.handleColorChange = this.handleColorChange.bind(this)

  }
  componentDidMount(){
    const dbRef = firebase.database().ref(`${this.props.userName}`+'/userPreferences/color');
    dbRef.on('value', (response) => {
      const data = response.val();
      const themeColor =response.val();
      console.log(data)


      this.setState({
        themeColor:themeColor
      })
    });
  }
handleChange(){
  let inputs = document.getElementsByTagName('input');
  let imageName = inputs[0].files[0].name;

  this.setState({
    logoURL:imageName
  });
}
  saveLogo(event){
    event.preventDefault();

    var storage = firebase.storage();
    var storageRef = storage.ref();
    var imagesRef = storageRef.child('images');

  }
  handleColorChange(){
    let inputs = document.getElementsByTagName('input');    
    this.setState({
      themeColor:inputs[1].value
    })
  }
  saveColor(event){
    event.preventDefault();
    const dbRef = firebase.database().ref( `${this.props.userName}` +'/userPreferences/');
    const newPref = {
      "color":this.state.themeColor
    }
    dbRef.set(newPref)
  }
  generateShareURL(event){
      event.preventDefault();
  }

    render() {
      return (
        <div className="dashboard"  style={{backgroundColor: this.state.themeColor}}>
         <img src={this.state.logoURL} />
          <input
            type="file" onChange={this.handleChange}
          />
          <button type="submit" onClick={this.saveLogo}>Save Logo</button>
          <input type="color" onChange={this.handleColorChange} />
          <button onClick={this.saveColor}>Save Color</button>
          <button onClick={this.generateShareURL}>Get Share URL</button>
          <SearchBar userName={this.props.user}/>
        </div> 
      )
    }
}

export default UserDashboard;

// const themeStyle = {
//   backgroundColor: this.state.themeColor
// }