import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import SearchBar from './SearchBar.js';

class UserDashboard extends Component {
  constructor() {
  super();  
  this.state={
    logoURL:'',
    themeColor:'',
    colorMessage:'Save color'
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
    logoURL:imageName,
    colorMessage:'Save color'
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
      themeColor:inputs[1].value,
      colorMessage:'Color saved'
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
    render() {
      return (
        <div>
          <h2>User Dashboard</h2>
          <div className="user-dashboard__header" style={{backgroundColor: this.state.themeColor}}>
           <img src={this.state.logoURL}  style={hideStyle}/>
            <input style={hideStyle}
              type="file" onChange={this.handleChange}
            />
            <button type="submit" onClick={this.saveLogo} style={hideStyle}>Save Logo</button>
            <p>Change theme color</p>
            <input type="color" onChange={this.handleColorChange} value={this.state.themeColor}/>
            <button onClick={this.saveColor}>{this.state.colorMessage}</button>
          </div>
          <SearchBar userName={this.props.userName}/>
        </div> 
      )
    }
}

export default UserDashboard;

const hideStyle ={
  display:'none'
}
