import React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import logo from "../assets/hoaxify.png"
class TopBar extends React.Component{


	render(){
		const { t , username , isLoggedIn , onLogout} = this.props;
		let links = (
			<ul className="navbar-nav">
		  		<li>
		  			<Link className="nav-link" to="login">
		  				{t('Login Page')}
		  			</Link>
		  		</li>
		  		<li>
		  			<Link className="nav-link" to="signup">
		  				{t('Sign Up')}
		  			</Link>
		  		</li>
		  	</ul>
		);

		if(isLoggedIn){
			links = (
				<ul className="navbar-nav">
					<li>
						<Link className="nav-link" to={"user/"+username}>
							{username}
						</Link>
					</li>
		  			<li onClick={onLogout} className="nav-link">{t("Logout")}</li>
		  		</ul>
			);
		}
		return(
			<div className="shadow-sm bg-light mb-2">
			<nav className="navbar navbar-light bg-light navbar-expand">
 			 	<div className="container-fluid">
			    	<Link className="navbar-brand" to="/">
			    		<img src={logo} width="60" alt="Hoaxify Logo"/>
			    		Hoaxify
			    	</Link>
			  	</div>
			  	{links}
			</nav>
			</div>
		);
	}
}

export default withTranslation()(TopBar);