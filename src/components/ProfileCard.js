import React from "react";
import { withRouter } from "react-router-dom";
const ProfileCard = (props) => {
	const pathUsername = props.match.params.username;
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
export default withRouter(ProfileCard);

