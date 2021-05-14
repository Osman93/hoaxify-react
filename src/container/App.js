import React from "react";
import { HashRouter as Router, Route , Redirect , Switch } from "react-router-dom";
import UserSignupPage from '../pages/UserSignupPage';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import UserPage from '../pages/UserPage';
import ApiProgress from '../shared/ApiProgress';
import LanguageSelector from '../components/LanguageSelector';
import TopBar from "../components/TopBar";


class App extends React.Component {
  state = {
    username:"",
    isLoggedIn:false
  }

  onLoginSuccess = (username) => {
    this.setState({
      username,
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
    const { username , isLoggedIn } = this.state;
    return (
      <div>
        	<Router>
      	    <TopBar isLoggedIn={isLoggedIn} username={username} onLogout={() => this.onLogout()}/>
        		<Switch>
  	        	<Route exact path="/" component={HomePage}/>
  		        {!isLoggedIn &&
                  <Route path="/login" component={LoginPage}/>
              }
  		        <Route path="/signup" component={UserSignupPage}/>
  		        <Route path="/user/:username" component={(props) =>{
                  return <UserPage {...props}/>
              }}/>
         		  <Redirect to="/" />{/*  Rouelardan hiçbiri yoksa bu alan anasayfaya yönlenecek Switch olmasa hep anasayfada*/}
  		     </Switch>
        	</Router>    
        	<LanguageSelector/> 
      </div>
    );
  }
}

export default App;
