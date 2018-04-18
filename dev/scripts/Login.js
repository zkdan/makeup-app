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
		// Ryan COMMENT:
		/*
			Another way you can do this is with computed properties.
			This is a method we teach in class

			this.setState({
				[field]: event.target.value
			});

			Where 'field' will be something like createEmail. This is new in ES6 but super nice!

			In fact, in your code where you have:

			<input type="password" placeholder="Please enter your desired password" onChange={(event) => this.handleChange(event, "createPassword")} />

			You could change that to be :

			<input type="password" placeholder="Please enter your desired password" onChange={this.handleChange} name="createPassword" />

			Where you add a name to the input and give it the value createPassword

			That way your handleChange method can be smaller

			handleChange(e) {
				this.setState({
					[e.target.name]: e.target.value
				});
			}

			Pretty sweeet?!
		*/
	}

	createUser(event){
		event.preventDefault();
		const email=this.state.createEmail;
		const password= this.state.createPassword;

		firebase.auth().createUserWithEmailAndPassword(email,password)
		.catch((error) => console.log(error.code, error.message))
		// Ryan COMMENT
		/* 
			Here I would make sure to do the setState in the `.then` of the createUserWIthEmailAndPassword method, that way we are not possilbiy getting into a state where the user is not actually created.


			.createUserWithEmailAndPassword(email,password)
			.then(() => {
				//do something good
			})
			.catch((error) => console.log(error.code, error.message))

		*/
		this.setState({
			createEmail:'',
			createPassword:'',
			userName:email.substring(0, email.indexOf('@'))
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
			// Ryan COMMENT!
			/* 
				OK! So this is a little interesting, up above you have a slight syntax "error", cause it is not quite an error, but it will not quite do what you want it to do. 

				You have the user signin and in the `.then` you do your successful resolve, but you also go to add the reject handler

				.then((success) => {

				}), (error) => {

				}

				But the syntax for this is not quite right, cause it should look like this.

				.then((success) => {

				}, (error) => {

				})

				The error callback is OUTSIDE of the `.then` method, but because of how the , operator works in JS it is not quite an error, but it will not do what you want! More can be found here (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comma_Operator)
			*/
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

				{this.state.loggedIn ?
					<div className="user-dashboard">
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

