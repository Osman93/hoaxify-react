import React , { Component } from "react";
import { withTranslation } from "react-i18next";
import { getUsers } from "../api/apiCall";
import UserListItem from "./UserListItem";
class UserList extends Component{

	state = {
		users: []
	}

	componentDidMount(){
		getUsers()
		.then((res) => {
			console.log(res);
			this.setState({
				users:res.data.content
			})
		})
	}

	render(){
		const { t } = this.props;
		return(
			<div className="container">
				<div className="card">
					<h3 className="card-header text-center">{ t("Users") }</h3>
					<div className="list-group-flush">
					{ this.state.users.map((item,index) => {
							return(
								<UserListItem key={item.username} user={item} />
								
							);

						})
						
					}
					</div>
				</div>
			</div>
		);
	}
}

export default withTranslation()(UserList);