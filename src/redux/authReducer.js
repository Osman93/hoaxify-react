import { LOGIN_SUCCESS , LOGOUT_SUCCESS } from "./Constants";

const initial = {
		username:"",
		isLoggedIn: false,
		displayName:"",
		image:"",
		password:"",
}
const authReducer = (state = { ...initial } , action ) => {
	console.log(action)
	if(action.type === LOGOUT_SUCCESS){
		return {...state,isLoggedIn:false};
	}
	else if(action.type === LOGIN_SUCCESS){
		return {
			...action.payload,
			isLoggedIn:true
		};
	}
	return state;
}

export default authReducer;