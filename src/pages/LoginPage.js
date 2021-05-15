import React , { useState , useEffect } from "react";
import axios from "axios";
import { withTranslation , useTranslation } from "react-i18next";
import { connect , useDispatch } from "react-redux";
import Input from "../components/Input";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { changeLanguage , login} from "../api/apiCall";
import { withApiProgress , useApiProgress } from "../shared/ApiProgress"
import { baseUrl } from "../api/apiCall";
import { loginHandler } from "../redux/authActions";

//import { Authantication } from "../shared/AuthanticationContext";

 const LoginPage = (props) => {
 	//static contextType = Authantication; //Class üzerinde bu şekilde context getirilir.

 	const [ username , setUsername ] = useState("");
 	const [ password , setPassword ] = useState("");
 	const [ error , setError ] = useState("");
	
	const dispatch = useDispatch();//Reduxta connect gerek kalmaması için

	useEffect(() => {
		setError("");
	},[username,password])

	
	
	const loginAction = async () => {
		const crediantials = {
			username:username,
			password:password
		} 
		try{
			await dispatch(loginHandler(crediantials));
			//.context.onLoginSuccess(authState);
			props.history.push("/")
		}catch(err){
			setError(err?.response?.data?.message);
		};
		
	}
	
	const { t } = useTranslation();
	const pendingCall = useApiProgress(baseUrl + "api/1.0/auth");
	console.log(pendingCall);
	const buttonEnabled = username && password;
		return (
			<div  className="container">
				<h1>{t("Login Page")}</h1>
				<Input 
					label={t("Username ?")}
					name="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<Input 
					label={t("Pass ?")}
					name="password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				{error && (
					<div className="alert alert-danger" role="alert">
 					 {error}
					</div>
				)}
				<ButtonWithProgress
					text={t("Sign In")}
					buttonEnabled={!buttonEnabled}
					onClick={loginAction}
					loading={pendingCall}
				/>

				
			</div>
		);
	
}
const LoginPageWithProgress = withApiProgress(
	LoginPage,
	baseUrl + "api/1.0/auth"
);



//const LoginPageRedux = connect()(LoginPageWithProgressAndTranslation);


export default LoginPage