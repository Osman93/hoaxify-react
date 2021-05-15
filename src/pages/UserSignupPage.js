import React , { useState } from "react";
import { withTranslation } from "react-i18next";
import { connect , useDispatch , useSelector } from "react-redux";
import { signup , changeLanguage } from "../api/apiCall";
import Input from "../components/Input";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { withApiProgress } from "../shared/ApiProgress"
import { baseUrl } from "../api/apiCall";
import { signupHandler } from "../redux/authActions";

const UserSignupPage = (props) => {

	const [ form , setForm ] = useState({
		username: undefined,
		displayName:undefined,
		password:undefined,
		passwordRepeat:undefined,
		aggreeClicked: false,
	});
	const [ aggreeClicked , setAggreeClicked ] = useState(false);
	const [ errors , setErrors ] = useState({});

	
	
	const onChange = (e) => {
		const {name,value} = e.target;
		setErrors((prev) => ({...prev,[name]:""}));//return ifadesi olmadan kullanım
		setForm((prev) => {
			return {
				...prev,
				[name]:value
			}
		})
		
	}
	const { username , displayName , password , passwordRepeat} = form;
	const formSubmit = async () =>{
		
		const body = {
			username,
			displayName,
			password
		};
		//this.setState({loading:true})
		try{
			const res = await props.dispatch(signupHandler(body));
			props.history.push("/");
		}catch(error){
			if(error.response.data.validationErrors){
				setErrors(error.response.data.validationErrors)
			}
		}
	}
	
	const { t } = props;
	const { username:usernameError } = errors;//const içinde casting yapar

	let passwordRepeatError ;
	if(password !== passwordRepeat){
		passwordRepeatError = t("Password mismatch");
	}
		return (
			<div className="container">
				<h1>{t('Sign Up')}</h1>
				<Input
					name="username"
					label={t("Username ?")}
					value={username}
					error={usernameError}
					onChange={onChange}
				/>
				<Input
					name="displayName"
					label={t("Display Name ?")}
					value={displayName}
					error={errors.displayName}
					onChange={onChange}
				/>
				
				<Input
					name="password"
					label={t("Pass ?")}
					value={password}
					error={errors.password}
					onChange={onChange}
				/>

				<Input
					name="passwordRepeat"
					label={t("Pass Repeat ?")}
					value={passwordRepeat}
					error={passwordRepeatError}
					onChange={onChange}
				/>
				<div class="form-group col-sm-12">
					<label>{t("Aggree ?")}</label>
					<input 
						className="form-control"
						type="checkbox"
						value={aggreeClicked}
						onChange={(e) => {
							setAggreeClicked(!aggreeClicked);
						}}
					/>
				</div>
				<ButtonWithProgress
					text={t("Sign Up")}
					buttonEnabled={!aggreeClicked} 
					onClick={formSubmit}
					loading={props.loading}
				/>
				

			

			</div>

		);
	
}
const UserSignupPageWithTransations = withTranslation()(UserSignupPage);
const UserSignupPageWithApiProgress = withApiProgress(UserSignupPageWithTransations,baseUrl + "api/1.0/users");
const UserSignupPageWithApiProgressAuth = withApiProgress(UserSignupPageWithApiProgress,baseUrl + "api/1.0/auth");
const UserSignupPageWithConnect = connect()(UserSignupPageWithApiProgressAuth);
export default UserSignupPageWithConnect;

