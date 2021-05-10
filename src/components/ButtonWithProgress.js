import React from "react";

const ButtonWithProgress = (props) => {
	return (
	<>
		<button 
			className="btn btn-danger btn-block"
			disabled={props.buttonEnabled}
			onClick={props.onClick}>
			{ props.loading &&
				(<div className="spinner-border text-light" role="status">
			  		<span className="sr-only">Loading...</span>
				</div>)
			}
			
				{props.text}
		</button>
	</>
	);
}
export default ButtonWithProgress;