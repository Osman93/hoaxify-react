import { LOGIN_SUCCESS , LOGOUT_SUCCESS } from "./Constants";
import { login , signup} from "../api/apiCall";



export const logoutSuccess = () => {
	return {
		type:LOGOUT_SUCCESS
	};
}

export const loginSuccess = (payload) => {
	return {
		type:LOGIN_SUCCESS,
		payload:payload
	};
}


export const loginHandler = (crediantials) => async (dispatch) =>{
	
	const response = await login(crediantials)
	const authState = {
		...response.data,
		password:crediantials.password
	}
	dispatch(loginSuccess(authState));
	return response;
}

export const signupHandler = (user) => {
	return async function(dispatch){
		const response = await signup(user);
		await dispatch(loginHandler(user))
		return response;
	}
}