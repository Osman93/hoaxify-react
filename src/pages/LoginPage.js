import React from "react";
import axios from "axios";
import { withTranslation } from "react-i18next";
import Input from "../components/Input";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { changeLanguage , login} from "../api/apiCall";
import { withApiProgress } from "../shared/ApiProgress"
import { baseUrl } from "../api/apiCall";
import { Authantication } from "../shared/AuthanticationContext";

 class LoginPage extends React.Component{
 	static contextType = Authantication; //Class üzerinde bu şekilde context getirilir.
	state = {
		username:"",
		password:"",
		error:"",
	}

	onChange(e){
		const {name,value} = e.target;
		this.setState({
			[name]:value,
			error:"",
		});
	}
	
	async loginAction(){
		const crediantials = {
			username:this.state.username,
			password:this.state.password
		} 
		try{

			const response = await login(crediantials)
			const authState = {
				...response.data,
				password:crediantials.password
			}
			this.context.onLoginSuccess(authState);
			this.props.history.push("/")
		}catch(err){
			console.log(err.response);
			this.setState({
				error:err.response.data.message,
			})
		};
		
	}
	render(){
		const { t } = this.props;
		const buttonEnabled = this.state.username && this.state.password;
		return (
			<div  className="container">
				<h1>{t("Login Page")}</h1>
				<Input 
					label={t("Username ?")}
					name="username"
					value={this.state.username}
					onChange={(e) => this.onChange(e)}
				/>
				<Input 
					label={t("Pass ?")}
					name="password"
					type="password"
					value={this.state.password}
					onChange={(e) => this.onChange(e)}
				/>
				{this.state.error && (
					<div className="alert alert-danger" role="alert">
 					 {this.state.error}
					</div>
				)}
				<ButtonWithProgress
					text={t("Sign In")}
					buttonEnabled={!buttonEnabled}
					onClick={()=>this.loginAction()}
					loading={this.props.loading}
				/>

				
			</div>
		);
	}
}

export default withApiProgress(
	withTranslation()(LoginPage),
	baseUrl + "api/1.0/auth"
);