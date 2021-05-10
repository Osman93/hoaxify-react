import React from "react";

const Input = (props) => {
	return (
		<div class="form-group col-sm-12">
			<label>{props.label}</label>
			<input 
				className={props.error ? "form-control is-invalid" : "form-control"}
				type={props.type ? props.type : "text"}
				value={props.value}
				name={props.name}
				onChange={props.onChange}
			/>
			<div className="invalid-feedback">{props.error}</div>
		</div>
	);
}
export default Input;