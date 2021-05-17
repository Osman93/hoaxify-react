import React from "react";
import { Link } from "react-router-dom"
import defaultImg from "../assets/profile.png"

const UserListItem = (props) => {
	const { user } = props;
	const { username , displayName , image } = user;
	let imageSource = defaultImg;

	if(image){
		imageSource = image;
	}
	return (
		<Link 
		to={`/user/${username}`}
		className="list-group-item list-group-item-action">
			<img className="rounded-circle"
			width="32"
			height="32"
			src={imageSource}
			/>
			<span className="pl-2">{username}</span>
		</Link>
	);
}

export default UserListItem; 

