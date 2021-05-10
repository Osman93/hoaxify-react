import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import UserSignupPage from '../pages/UserSignupPage';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import UserPage from '../pages/UserPage';
import ApiProgress from '../shared/ApiProgress';
import LanguageSelector from '../components/LanguageSelector';



function App() {
  return (
    <div>
      <BrowserRouter>
        <Route path="/" component={HomePage}/>
        <Route path="/login" component={LoginPage}/>
      </BrowserRouter>    
      <LanguageSelector/> 
    </div>
  );
}

export default App;
