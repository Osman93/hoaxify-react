import React , { Component } from "react";

export const Authantication = React.createContext();

export default class AuthanticationContext extends Component{
	state = {
		username:"",
		isLoggedIn: false,
		displayName:"",
		image:"",
		password:"",
	}

	onLoginSuccess = (authState) => {
    	this.setState({
	      ...authState,
	      isLoggedIn:true
	    });
	}	

	onLogout(){
	    this.setState({
	      username:"",
	      isLoggedIn:false
	    })
	}
	render(){
		return (
			<Authantication.Provider value={{
				state: {...this.state},
				onLoginSuccess:this.onLoginSuccess,
				onLogout:() => this.onLogout()
			}}>
				{this.props.children}
			</Authantication.Provider>
		);
	}
} 