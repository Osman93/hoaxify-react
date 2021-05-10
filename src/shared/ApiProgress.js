import React from "react";
import axios from "axios";
export function withApiProgress(WrappedComponent,apiPath){
	return class extends React.Component{
		state = {
			loading:false
		}	

		componentDidMount(){
			axios.interceptors.request.use((request) => {
				//console.log(request.url);
				if(request.url === apiPath){
					this.setState({
						loading:true
					})
				}
				return request;
			})	

			axios.interceptors.response.use(
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
		render(){
			return(
				<WrappedComponent loading={this.state.loading} {...this.props}/>
			);
		}
	}
}


