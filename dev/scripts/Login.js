import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import UserDashboard from './UserDashboard.js'
import DisplayCase from './DisplayCase.js'

class Login extends Component {
	constructor(props) {
	  super();
	  this.state = {
	    loggedIn: false,
	    createEmail:'',
	    createPassword:'',
	    loginEmail:'',
	    loginPassword:''
	  }
	  this.handleChange = this.handleChange.bind(this);
	  this.createUser = this.createUser.bind(this);
	  this.signIn = this.signIn.bind(this);
	  this.signOut = this.signOut.bind(this);

	}
	
	handleChange(event, field){
		const newState = Object.assign({}, this.state);
		newState[field] = event.target.value;
		this.setState(newState);
	}

	createUser(event){
		event.preventDefault();
		const email=this.state.createEmail;
		const password= this.state.createPassword;

		firebase.auth().createUserWithEmailAndPassword(email,password)
		.catch((error) => console.log(error.code, error.message))
		
		this.setState({
			createEmail:'',
			createPassword:'',
			userName:userName
		})


	}
	signIn(event) {
	    event.preventDefault();
	    const email = this.state.loginEmail;
	    const password = this.state.loginPassword;


	    firebase.auth().signInWithEmailAndPassword(email, password)
	      .then((success) => {
	        console.log(`Logged in as ${success.email}`);
		    this.setState({
		    	userName:email.substring(0, email.indexOf('@'))
		    })
	      }), (error) => {
	        console.log(error);
	    }
 	}

	signOut(event){
		event.preventDefault;

		firebase.auth().signOut().then(function(success){
			console.log('signed out!')
		}, function(error){
			console.log(error)
		})
	}
	componentDidMount(){
		firebase.auth().onAuthStateChanged((user) => {
		      if (user) {
		        this.setState({loggedIn: true});
		      } else {
		        this.setState({loggedIn: false});
		      }
		    })
	}
    render() {
      return (
      	<div>

      	        { this.state.loggedIn ?
				<div>
					<div className='sign-out'>
						<button onClick={this.signOut}>Sign Out</button>
					</div>
					<UserDashboard userName={this.state.userName}/>
					<DisplayCase userName={this.state.userName}/>
				</div>
      	        :
      	          <div className="welcome">
      	          	<h2>Makeup App</h2>
	      	          <div className="create-user">
	      	            <form onSubmit={(event) => this.createUser(event)}>
	      	              <input type="text" placeholder="Please enter your e-mail address" onChange={(event) => this.handleChange(event, "createEmail")} />
	      	              <input type="password" placeholder="Please enter your desired password" onChange={(event) => this.handleChange(event, "createPassword")} />
	      	              <button>Create User</button>
	      	            </form>
	      	          </div>
	      	          <div className="sign-in-user">
	      	            <form onSubmit={(event) => this.signIn(event)}>
	      	              <input type="text" placeholder="Please enter your e-mail address" onChange={(event) => this.handleChange(event, "loginEmail")} />
	      	              <input type="password" placeholder="Please enter your desired password" onChange={(event) => this.handleChange(event, "loginPassword")} />
	      	              <button>Login</button>
	      	            </form>
	      	          </div>
      	          </div>
      	        }
      	</div>
      )
    }

}

export default Login;

