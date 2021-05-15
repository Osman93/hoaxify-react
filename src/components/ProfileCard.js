import React from "react";
import { withRouter , useParams } from "react-router-dom";
import { connect } from "react-redux";
//import {Authantication} from "../shared/AuthanticationContext";
const ProfileCard = (props) => {
	//const pathUsername = props.match.params.username;
	const routeParams = useParams();
	const pathUsername = routeParams.username;
	const loggedInUser = props.username;

	let message = "We cant edit";
	if(loggedInUser === pathUsername){
		message = "We can edit";
	}
	return (
		<div>
			Profile Card Url = {message}
		</div>
	);
}

/*class ProfileCardContext extends React.Component{
	static contextType = Authantication;
	render(){
		return(
			<>
				<ProfileCard
					{...this.props}
					username={this.context.state.username}
				/>
			</>
		);
	}
}*/
const mapStateToProps = (store) => {
	return {
		username:store.username
	}
}
export default connect(mapStateToProps)(ProfileCard);

