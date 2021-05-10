import React from "react";
import { withTranslation } from "react-i18next";
import { signup , changeLanguage } from "../api/apiCall";
import Input from "../components/Input";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { withApiProgress } from "../shared/ApiProgress"
import { baseUrl } from "../api/apiCall";
class UserSignupPage extends React.Component{
	state = {
		username: "",
		displayName:"",
		password:"",
		passwordRepeat:"",
		aggreeClicked: false,
		errors:{}
	}
	onChange(e){
		const {name,value} = e.target;
		const errors = {...this.state.errors};
		errors[name] = "";

		if(name === "password" || name === "passwordRepeat"){
			if(name === "password" && value != this.state.passwordRepeat){
				errors.passwordRepeat = this.props.t("Password mismatch");
			}else if(name === "passwordRepeat" && value != this.state.password){
				errors.passwordRepeat = this.props.t("Password mismatch");
			}else{
				errors.passwordRepeat = "";


			}
		}

		this.setState({
			[name]:value,
			errors
		})
	}

	async formSubmit(){
		const { username , displayName , password } = this.state;
		const body = {
			username,
			displayName,
			password
		};
		//this.setState({loading:true})
		try{
			const res = await signup(body);

		}catch(error){
			console.log(error.response);
			if(error.response.data.validationErrors){
				this.setState({
					errors:error.response.data.validationErrors
				})
			}
		}
		//this.setState({loading:false})
	}
	render(){
		const { t } = this.props;
		return (
			<div className="container">
				<h1>{t('Sign Up')}</h1>
				<Input
					name="username"
					label={t("Username ?")}
					value={this.state.username}
					error={this.state.errors.username}
					onChange={(e) => this.onChange(e)}
				/>
				<Input
					name="displayName"
					label={t("Display Name ?")}
					value={this.state.displayName}
					error={this.state.errors.displayName}
					onChange={(e) => this.onChange(e)}
				/>
				
				<Input
					name="password"
					label={t("Pass ?")}
					value={this.state.password}
					error={this.state.errors.password}
					onChange={(e) => this.onChange(e)}
				/>

				<Input
					name="passwordRepeat"
					label={t("Pass Repeat ?")}
					value={this.state.passwordRepeat}
					error={this.state.errors.passwordRepeat}
					onChange={(e) => this.onChange(e)}
				/>
				<div class="form-group col-sm-12">
					<label>{t("Aggree ?")}</label>
					<input 
						className="form-control"
						type="checkbox"
						value={this.state.aggreeClicked}
						onChange={(e) => {
							this.setState({
								aggreeClicked:!this.state.aggreeClicked
							})
						}}
					/>
				</div>
				<ButtonWithProgress
					text={t("Sign Up")}
					buttonEnabled={!this.state.aggreeClicked} 
					onClick={()=>this.formSubmit()}
					loading={this.props.loading}
				/>
				

			

			</div>

		);
	}
}
const UserSignupPageWithTransations = withTranslation()(UserSignupPage);
const UserSignupPageWithApiProgress = withApiProgress(UserSignupPageWithTransations,baseUrl + "api/1.0/users");
export default UserSignupPageWithApiProgress;