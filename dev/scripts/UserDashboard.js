import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import SearchBar from './SearchBar.js';

class UserDashboard extends Component {
  constructor() {
    super();  
    this.state={
      logoURL:'',
      themeColor:''
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
      // Ryan COMMENTS
      /*
        One small refactor you could do here is to use the ES6 short hand property assignment

        this.setState({ themeColor });

        Is the same as:

        this.setState({
          themeColor: themeColor
        });
      */
    });
  }
  handleChange(){
    let inputs = document.getElementsByTagName('input');
    let imageName = inputs[0].files[0].name;

    this.setState({
      logoURL:imageName  
    });
    // Ryan COMMENT!
    /*
      Here you don't need to use the document to select the input 
      if the function took the event, you can get the `.target` prop from that.

      I know you didn't finish this feature, just pointing that out!

    */
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
    // Ryan COMMENT!
    /* 
      If this method took the event, we would not have to use the `document` here. It is not a good practice to use the document to select elements from the DOM.
      
      handleColorChange(e) {
        this.setState({
          themeColor: e.target.value
        });
      }

      This also make the use of `inputs[1]` go away, cause you are doing that because you get a nodeList back with `.getElementsByTagName` and if you added more inputs before that, then it would break!

    */
  }
  saveColor(event){
    event.preventDefault();
    const dbRef = firebase.database().ref( `${this.props.userName}` +'/userPreferences/');
    //Ryan COMMENT!
    /*
      .ref( `${this.props.userName}` +'/userPreferences/');

      On this line here, you using both a template literal, and concatenation, this could be simplified by just using the template literal.

      .ref(`${this.props.userName}/userPreferences/`);
    */
    const newPref = {
      "color":this.state.themeColor
    }
    dbRef.set(newPref)
  }
    render() {
      return (
        <div>
          <h2>{this.props.userName}'s Dashboard</h2>
          <div className="user-dashboard__header" style={{backgroundColor: this.state.themeColor}}>
           <img src={this.state.logoURL}  style={hideStyle}/>
            <input style={hideStyle}
              type="file" onChange={this.handleChange}
            />
            <button type="submit" onClick={this.saveLogo} style={hideStyle}>Save Logo</button>
            <p>Change theme color</p>
            <input type="color" onChange={this.handleColorChange} value={this.state.themeColor}/>
            <button onClick={this.saveColor}>Save color</button>
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
