import axios from "axios";
export const baseUrl = "http://localhost:8081/";
export const signup = (body) => {
	return axios.post(baseUrl + "api/1.0/users",body);
}

export const login = (crediantials) => {
	return axios.post(baseUrl + "api/1.0/auth",{},{ auth:crediantials });
}

export const changeLanguage = (lang) => {
	axios.defaults.headers["accept-language"] = lang;
}

export const getUsers = () => {
	return axios.get(baseUrl + "api/1.0/users");
}