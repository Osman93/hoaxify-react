import React , { useState , useEffect } from "react";
import axios from "axios";

export const useApiProgress = (apiPath) => {
	const [ loading , setLoading ] = useState(false);
	let requestInterceptors, responseInterceptors;
	useEffect( () => {
		requestInterceptors = axios.interceptors.request.use((request) => {
			console.log(request.url);
			if(request.url === apiPath){
				setLoading(true)
			}
			return request;
		})	

		responseInterceptors = axios.interceptors.response.use(
			response => {
				if(response.config.url === apiPath){
					setLoading(false)
				}
				return response;
			},
			error => {
				if(error.config.url === apiPath){
					setLoading(false)
				}
				throw error;
			}
		);

		return () => {
			axios.interceptors.request.eject(requestInterceptors);
			axios.interceptors.response.eject(responseInterceptors);
		}

	})
	return loading;
}	


function getDisplayName(Component){
	console.log(Component);
	return Component.displayName || Component.name;
}

export function withApiProgress(WrappedComponent,apiPath){
	return class extends React.Component{
		static displayName = `Api Progress(shared) ${getDisplayName(WrappedComponent)}`;
		state = {
			loading:false
		}	

		componentDidMount(){
			this.requestInterceptors = axios.interceptors.request.use((request) => {
				console.log(request.url);
				if(request.url === apiPath){
					this.setState({
						loading:true
					})
				}
				return request;
			})	

			this.responseInterceptors = axios.interceptors.response.use(
				response => {
					if(response.config.url === apiPath){
						this.setState({
							loading:false
						})
					}
					return response;
				},
				error => {
					if(error.config.url === apiPath){
						this.setState({
							loading:false
						});
					}
					throw error;
				}
			);
		}
		componentWillUnmount(){
			axios.interceptors.request.eject(this.requestInterceptors);
			axios.interceptors.response.eject(this.responseInterceptors);
		}
		render(){
			return(
				<WrappedComponent loading={this.state.loading} {...this.props}/>
			);
		}
	}
}


