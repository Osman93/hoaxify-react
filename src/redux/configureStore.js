import { createStore , applyMiddleware } from "redux";
import thunk from "redux-thunk";
import authReducer from "./authReducer";

const configureStore = () => {
	const user = localStorage.getItem("user");
	let initial = {
		username:"",
		isLoggedIn: false,
		displayName:"",
		image:"",
		password:"",
	}
	if(user){
		initial = JSON.parse(user);
	} 

	const store = createStore(authReducer,initial,applyMiddleware(thunk));
	store.subscribe(() => {
		localStorage.setItem("user",JSON.stringify(store.getState()));
	})
	return store;
}

export default configureStore;